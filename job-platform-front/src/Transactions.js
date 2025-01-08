import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, Button } from "@mui/material";
import { ethers } from "ethers";

// Recursiv colectăm toate CALL-urile
function getAllCalls(traceObj, calls = []) {
  if (!traceObj) return calls;
  const subTraces = traceObj.calls || traceObj.subtraces || traceObj.trace || [];
  if (Array.isArray(subTraces)) {
    for (const st of subTraces) {
      if (st.type === "CALL") {
        const from = st.action?.from?.toLowerCase() || "";
        const to = st.action?.to?.toLowerCase() || "";
        const valueHex = st.action?.value || "0x0";
        const value = parseFloat(ethers.formatEther(valueHex));
        calls.push({ from, to, value });
      }
      getAllCalls(st, calls);
    }
  }
  return calls;
}

const Transactions = ({ account, provider }) => {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTxs = async () => {
    if (!provider || !account) {
      console.log("Missing provider or account");
      return;
    }
    try {
      setLoading(true);
      const latestBlock = await provider.getBlockNumber();
      const results = [];

      const userAddr = account.toLowerCase();

      for (let i = 0; i <= latestBlock; i++) {
        const block = await provider.getBlockWithTransactions(i);
        if (!block?.transactions?.length) continue;

        for (const tx of block.transactions) {
          // Apelam debug_traceTransaction
          let trace;
          try {
            trace = await provider.send("debug_traceTransaction", [tx.hash, {}]);
          } catch (err) {
            continue; // Poate arunca eroare, să nu crash-uiască
          }
          // Subcalls
          const calls = getAllCalls(trace);
          const mainFrom = tx.from?.toLowerCase() || "";
          const mainTo = tx.to?.toLowerCase() || "";

          // Verific dacă user e in main TX...
          let userInMain = (mainFrom === userAddr || mainTo === userAddr);
          // Sau user e in subcalls
          let userInSub = calls.some((c) => c.from === userAddr || c.to === userAddr);

          if (userInMain || userInSub) {
            results.push({
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: parseFloat(ethers.formatEther(tx.value)),
              blockNumber: i,
              time: block.timestamp ? new Date(block.timestamp * 1000).toLocaleString() : "N/A",
              internalCalls: calls // conține array cu { from, to, value }
            });
          }
        }
      }
      setTxs(results);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTxs();
  }, [account, provider]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Transactions for {account}
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : txs.length === 0 ? (
        <Typography>No transactions found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hash</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Block</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Internal Transfers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {txs.map((tx, idx) => (
              <TableRow key={idx}>
                <TableCell>{tx.hash.slice(0, 10)}...</TableCell>
                <TableCell>{tx.from}</TableCell>
                <TableCell>{tx.to}</TableCell>
                <TableCell>{tx.value.toFixed(4)} ETH</TableCell>
                <TableCell>{tx.blockNumber}</TableCell>
                <TableCell>{tx.time}</TableCell>
                <TableCell>
                  {tx.internalCalls && tx.internalCalls.length > 0 ? (
                    <ul style={{ textAlign: "left" }}>
                      {tx.internalCalls.map((c, i) => (
                        <li key={i}>
                          <b>CALL</b> {c.from} → {c.to}, value: {c.value.toFixed(4)} ETH
                        </li>
                      ))}
                    </ul>
                  ) : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button variant="contained" onClick={fetchTxs} style={{ marginTop: 16 }}>
        Refresh
      </Button>
    </Box>
  );
};

export default Transactions;
