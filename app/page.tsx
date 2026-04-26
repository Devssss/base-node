'use client';

import { useBlockNumber, useGasPrice } from 'wagmi';
import { formatGwei } from 'viem';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  Lock, 
  RefreshCw, 
  Terminal,
  Zap,
  User,
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  HardDrive,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  ConnectWallet, 
  Wallet, 
  WalletDropdown, 
  WalletDropdownLink, 
  WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { useState, useEffect } from 'react';

export default function Home() {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: gasPrice } = useGasPrice({ watch: true });
  const [isHealthy, setIsHealthy] = useState(true);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
      // Simulate rare health flickers
      if (Math.random() > 0.99) {
        setIsHealthy(prev => !prev);
        setTimeout(() => setIsHealthy(true), 3000);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200 font-sans flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <nav className="h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-[#0F1219] shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#0052FF] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,82,255,0.3)]">
            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-lg font-semibold tracking-tight">BASE <span className="text-slate-500 font-normal underline decoration-slate-700 underline-offset-4">NODE PRO</span></span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Node Synchronized</span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          
          <Wallet className="bg-transparent border-none p-0!">
            <ConnectWallet className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] h-9 px-4 rounded-md transition-colors font-sans uppercase tracking-widest">
              <Avatar className="h-5 w-5 mr-2" />
              <Name />
            </ConnectWallet>
            <WalletDropdown className="bg-[#111] border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
              <Identity className="px-4 pt-4 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address className="text-slate-500" />
                <EthBalance />
              </Identity>
              <div className="h-px bg-slate-800 mx-4 my-2" />
              <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">Wallet Dashboard</WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 border-r border-slate-800 p-4 shrink-0 bg-[#0F1219] flex flex-col">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest px-3 mb-4">Core Modules</div>
          <nav className="space-y-1 flex-1">
            <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-[#1C222E] text-white rounded-md shadow-sm">
              <LayoutDashboard className="w-4 h-4 text-[#0052FF]" />
              <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 hover:bg-slate-800 text-slate-400 transition-colors rounded-md group">
              <Users className="w-4 h-4 group-hover:text-white transition-colors" />
              <span className="text-sm">Active Peers</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 hover:bg-slate-800 text-slate-400 transition-colors rounded-md group">
              <BarChart3 className="w-4 h-4 group-hover:text-white transition-colors" />
              <span className="text-sm">Network Metrics</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 hover:bg-slate-800 text-slate-400 transition-colors rounded-md group">
              <Settings className="w-4 h-4 group-hover:text-white transition-colors" />
              <span className="text-sm">Configuration</span>
            </a>
          </nav>

          <div className="pt-8 pt-8 border-t border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest px-3 mb-4">Node Resources</div>
            <div className="px-3 space-y-4 pb-4">
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-slate-400 font-mono">CPU Cycle</span>
                  <span className="text-white font-mono">32%</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "32%" }}
                    className="h-full bg-sky-500" 
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-slate-400 font-mono">SSD Throughput</span>
                  <span className="text-white font-mono">1.2 TB</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Dashboard Heading (Hidden on sidebar desktop, visible content) */}
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-white">System Overview</h2>
              <p className="text-sm text-slate-500">Real-time telemetry from the Base Mainnet node cluster.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Session Duration</span>
              <span className="text-xs font-mono text-[#0052FF]">{formatUptime(uptime)}</span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div 
               whileHover={{ y: -2 }}
               className="bg-[#151921] border border-slate-800 p-4 rounded-xl shadow-sm space-y-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-3 h-3 text-sky-400" />
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Block Height</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.h3 
                  key={blockNumber?.toString()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-mono font-semibold text-white tracking-tighter"
                >
                  {blockNumber ? blockNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "---,---"}
                </motion.h3>
              </AnimatePresence>
              <p className="text-[10px] text-emerald-500 font-medium">+1 block every 2s</p>
            </motion.div>

            <motion.div 
               whileHover={{ y: -2 }}
               className="bg-[#151921] border border-slate-800 p-4 rounded-xl shadow-sm space-y-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Network Gas</p>
              </div>
              <h3 className="text-2xl font-mono font-semibold text-white tracking-tighter">
                {gasPrice ? parseFloat(formatGwei(gasPrice)).toFixed(4) : "0.0000"} <span className="text-sm text-slate-500 italic">gwei</span>
              </h3>
              <p className="text-[10px] text-slate-400">Current L2 Congestion: Low</p>
            </motion.div>

            <motion.div 
               whileHover={{ y: -2 }}
               className="bg-[#151921] border border-slate-800 p-4 rounded-xl shadow-sm space-y-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-3 h-3 text-[#0052FF]" />
                <p className="text-[10px] uppercase tracking-widest text-slate-500">L1 State Link</p>
              </div>
              <h3 className="text-2xl font-mono font-semibold text-white tracking-tighter">Verified</h3>
              <p className="text-[10px] text-sky-400 font-medium">12.4ms Latency</p>
            </motion.div>

            <motion.div 
               whileHover={{ y: -2 }}
               className="bg-[#151921] border border-slate-800 p-4 rounded-xl shadow-sm space-y-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Mem Pool</p>
              </div>
              <h3 className="text-2xl font-mono font-semibold text-white tracking-tighter">1,402 <span className="text-sm text-slate-500">TXs</span></h3>
              <p className="text-[10px] text-amber-500 font-medium">3.4 TPS Avg</p>
            </motion.div>
          </div>

          {/* Node Statistics Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Node Statistics</span>
              <div className="h-px flex-1 bg-slate-800/50" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-[#151921] border border-slate-800 p-5 rounded-xl shadow-sm flex items-center gap-5">
                <div className="p-3 bg-sky-500/10 rounded-lg shrink-0">
                  <Cpu className="w-6 h-6 text-sky-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">CPU Core Load</span>
                    <span className="text-sm font-mono text-white">42.8%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["42%", "48%", "45%", "52%", "42%"] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="h-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#151921] border border-slate-800 p-5 rounded-xl shadow-sm flex items-center gap-5">
                <div className="p-3 bg-[#0052FF]/10 rounded-lg shrink-0">
                  <HardDrive className="w-6 h-6 text-[#0052FF]" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Memory Allocation</span>
                    <span className="text-sm font-mono text-white">12.4 GB</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["72%", "74%", "73%"] }}
                      transition={{ duration: 10, repeat: Infinity }}
                      className="h-full bg-[#0052FF] shadow-[0_0_10px_rgba(0,82,255,0.5)]" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#151921] border border-slate-800 p-5 rounded-xl shadow-sm flex items-center gap-5">
                <div className="p-3 bg-emerald-500/10 rounded-lg shrink-0">
                  <Activity className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Network I/O</span>
                    <span className="text-sm font-mono text-white">284 Mb/s</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["20%", "85%", "45%", "90%", "30%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#151921] border border-slate-800 p-5 rounded-xl shadow-sm flex items-center gap-5">
                <div className={`p-3 rounded-lg shrink-0 ${isHealthy ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  {isHealthy ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Network Health</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-mono ${isHealthy ? 'text-white' : 'text-red-400 font-bold'}`}>
                      {isHealthy ? 'Optimal' : 'Degraded'}
                    </span>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${isHealthy ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Layout: Feed and Sync */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#151921] border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[300px]">
              <div className="px-4 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 text-sky-400 animate-[spin_4s_linear_infinite]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Real-time Block Stream</span>
                </div>
                <span className="text-[9px] text-slate-600 font-mono tracking-wider">node:geth/v1.12.0-base</span>
              </div>
              
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800/50 bg-slate-800/10">
                      <th className="px-4 py-3 text-slate-500 font-normal">HEIGHT</th>
                      <th className="px-4 py-3 text-slate-500 font-normal">HASH</th>
                      <th className="px-4 py-3 text-slate-500 font-normal">TXS</th>
                      <th className="px-4 py-3 text-right text-slate-500 font-normal">TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 py-3 text-sky-400 font-bold">{blockNumber ? Number(blockNumber).toString() : "Loading..."}</td>
                      <td className="px-4 py-3 text-slate-400 font-mono">0x4f2a...c19e</td>
                      <td className="px-4 py-3 text-slate-300">142</td>
                      <td className="px-4 py-3 text-right text-slate-500">Just now</td>
                    </tr>
                    <tr className="border-b border-slate-800/30 bg-slate-800/5 hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 py-3 text-sky-400 font-bold">{blockNumber ? (Number(blockNumber) - 1).toString() : "---"}</td>
                      <td className="px-4 py-3 text-slate-400">0xa3b8...8841</td>
                      <td className="px-4 py-3 text-slate-300">89</td>
                      <td className="px-4 py-3 text-right text-slate-500">2s ago</td>
                    </tr>
                    <tr className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 py-3 text-sky-400 font-bold">{blockNumber ? (Number(blockNumber) - 2).toString() : "---"}</td>
                      <td className="px-4 py-3 text-slate-400">0x12d9...ff04</td>
                      <td className="px-4 py-3 text-slate-300">216</td>
                      <td className="px-4 py-3 text-right text-slate-500">4s ago</td>
                    </tr>
                    <tr className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 py-3 text-sky-400 font-bold">{blockNumber ? (Number(blockNumber) - 3).toString() : "---"}</td>
                      <td className="px-4 py-3 text-slate-400">0x98e1...42bc</td>
                      <td className="px-4 py-3 text-slate-300">64</td>
                      <td className="px-4 py-3 text-right text-slate-500">6s ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#151921] border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col items-center justify-between text-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 block">Node Sync Status</span>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <motion.circle 
                      cx="64" cy="64" r="58" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="364.4" 
                      initial={{ strokeDashoffset: 364.4 }}
                      animate={{ strokeDashoffset: 364.4 * (1 - 0.998) }}
                      className="text-[#0052FF]" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white tracking-tight">99.8</span>
                    <span className="text-[8px] text-slate-500 font-bold">% SYNCED</span>
                  </div>
                </div>
              </div>
              <div className="w-full pt-6 border-t border-slate-800 mt-4">
                <div className="text-[11px] text-slate-400 mb-2">Estimated completion time</div>
                <div className="text-xs font-mono text-white">~ 12 Minutes (Current Chain State)</div>
              </div>
            </div>
          </div>

          {/* Terminal Controls and Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#0B0E14] border border-slate-800 rounded-xl flex flex-col h-56 shadow-inner">
              <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center bg-[#151921] rounded-t-xl shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Terminal Process [system_log]</span>
                </div>
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-sm"></div>
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-sm"></div>
                </div>
              </div>
              <div className="flex-1 p-4 font-mono text-[10px] leading-relaxed overflow-y-auto custom-scrollbar text-slate-400 bg-slate-900/10">
                <p><span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span> <span className="text-sky-400 uppercase font-bold mr-2">INFO</span> Peer Discovery: 52.1.44.192 Established (Mainnet)</p>
                <p><span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span> <span className="text-sky-400 uppercase font-bold mr-2">INFO</span> Root Sync: Submitting local state to L1 Anchor</p>
                <p><span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span> <span className="text-emerald-400 uppercase font-bold mr-2">SUCCESS</span> Block #{blockNumber} verified successfully</p>
                <p><span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span> <span className="text-sky-400 uppercase font-bold mr-2">INFO</span> Optimistic Batch Execution: Sequence #99210 complete</p>
                <p><span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span> <span className="text-slate-500 uppercase font-bold mr-2">DEBUG</span> GC: State pruning initiated (Retention: 1024)</p>
                <p><span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span> <span className="text-amber-400 uppercase font-bold mr-2">WARN</span> Peers detected imbalance (ratio 38:62). Rebalancing...</p>
              </div>
            </div>

            <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <Identity className="p-0 bg-transparent flex-1" schemaId="0xf8b052c10ee578a73fe9941ec5a7a7b3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 rounded-lg border border-slate-700 grayscale hover:grayscale-0 transition-grayscale" />
                    <div>
                      <Name className="text-sm font-bold text-white block truncate max-w-[120px]" />
                      <Address className="text-[9px] text-slate-500" />
                    </div>
                  </div>
                </Identity>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-500 uppercase font-medium">Node Balance</span>
                  <div className="flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-slate-700" />
                    <span className="text-[9px] text-slate-700 uppercase">Secured</span>
                  </div>
                </div>
                <EthBalance className="text-xl font-bold font-mono text-white" />
              </div>
              <button 
                className="w-full py-3 bg-[#0052FF] hover:bg-[#004BFF] text-white rounded-lg transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Execute Transaction <Zap className="w-3 h-3 fill-white" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer Status Bar */}
      <footer className="h-8 border-t border-slate-800 bg-[#0F1219] px-6 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-[9px] text-slate-500 uppercase tracking-tighter">Network Engine:</span>
            <span className="text-[10px] text-slate-300 font-medium">Mainnet Node v1.1.2</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[9px] text-slate-500 uppercase tracking-tighter">Chain State:</span>
            <span className="text-[10px] text-blue-400 font-mono">8453 (Base)</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono">
          <span className="hidden sm:inline">NODE_ID: 0x4a92...ef31</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 18, 25, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(47, 51, 61, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 82, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
