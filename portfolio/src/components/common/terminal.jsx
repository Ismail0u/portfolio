import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import TERMINAL_COMMANDS from '../../constants/terminalCommand';

/**
 * ============================================
 * TERMINAL COMPONENT
 * ============================================
 * Terminal interactif style hacker avec:
 * - Commandes personnalisées
 * - ASCII art
 * - Autocomplete
 * - Historique
 * - Easter eggs
 * ============================================
 */

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Terminal v1.0.0 - Tapez "help" pour commencer' },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  // Auto-focus input quand terminal s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll vers le bas
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  // Raccourci clavier Ctrl+`
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Exécute une commande
  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory((prev) => [
      ...prev,
      { type: 'input', content: `$ ${cmd}` },
    ]);

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'matrix') {
      startMatrixEffect();
      setHistory((prev) => [
        ...prev,
        { type: 'success', content: 'Mode Matrix activé... 🟢' },
      ]);
      return;
    }

    if (trimmedCmd === 'konami') {
      setHistory((prev) => [
        ...prev,
        { 
          type: 'success', 
          content: '🎮 Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A\nBravo, tu es un vrai gamer!' 
        },
      ]);
      return;
    }

    const command = TERMINAL_COMMANDS[trimmedCmd];
    if (command) {
      const output = typeof command.output === 'function' 
        ? command.output() 
        : command.output;
      
      setHistory((prev) => [
        ...prev,
        { type: 'output', content: output },
      ]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      { 
        type: 'error', 
        content: `Commande non reconnue: "${cmd}"\nTapez "help" pour voir les commandes disponibles.` 
      },
    ]);
  };

  // Matrix rain effect
  const startMatrixEffect = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    let output = '';
    
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 50; j++) {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
      output += '\n';
    }
    
    setHistory((prev) => [
      ...prev,
      { type: 'matrix', content: output },
    ]);
  };

  // Handle input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);

    executeCommand(input);
    setInput('');
  };

  // Navigation historique
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const getLineColor = (type) => {
    switch (type) {
      case 'input':
        return 'text-cyan-400';
      case 'output':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-yellow-400';
      case 'matrix':
        return 'text-green-500 font-mono text-xs';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gray-900 hover:bg-gray-800 text-green-400 p-4 rounded-full shadow-2xl border-2 border-green-500/30 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-ping" />
          
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-green-400 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Terminal (Ctrl + `)
          </span>
        </motion.button>
      )}

      {/* TERMINAL WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`
              fixed z-50 bg-gray-900 rounded-lg shadow-2xl border border-green-500/30 overflow-hidden
              ${isMaximized 
                ? 'inset-4' 
                : 'bottom-6 right-6 w-[600px] h-[400px]'
              }
            `}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-green-500/30">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-mono text-green-400">
                  terminal@moussa-ismael
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  {isMaximized ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="h-full flex flex-col">
              {/* History */}
              <div
                ref={historyRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1"
              >
                {history.map((line, i) => (
                  <div key={i} className={getLineColor(line.type)}>
                    <pre className="whitespace-pre-wrap break-words">
                      {line.content}
                    </pre>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-green-500/30">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-mono">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      handleKeyDown(e);
                      if (e.key === 'Enter') handleSubmit(e);
                    }}
                    className="flex-1 bg-transparent text-green-400 font-mono outline-none"
                    placeholder="Tapez une commande..."
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </div>
            </div>

            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}