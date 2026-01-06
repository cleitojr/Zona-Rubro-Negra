import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Users, RefreshCw, Star, Search, Youtube } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { UserProfile } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [members, setMembers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterTier, setFilterTier] = useState<string>('all');
  const [winner, setWinner] = useState<UserProfile | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (isOpen) {
        fetchMembers();
    }
  }, [isOpen]);

  const fetchMembers = async () => {
    setLoading(true);
    // In a real scenario, this fetches all profiles. For security, RLS usually blocks listing all users unless admin.
    const { data, error } = await supabase
        .from('profiles')
        .select('*');
    
    if (data) {
        // Casting for this example since Supabase return type matches UserProfile mostly
        setMembers(data as any); 
    }
    setLoading(false);
  };

  const filteredMembers = members.filter(m => 
    filterTier === 'all' ? true : m.membership_tier === filterTier
  );

  const handleRaffle = () => {
    if (filteredMembers.length === 0) return;
    
    setIsRolling(true);
    setWinner(null);

    // Animation effect of cycling through names
    let interval: any;
    let counter = 0;
    
    interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * filteredMembers.length);
        setWinner(filteredMembers[randomIndex]);
        counter++;
        if (counter > 20) {
            clearInterval(interval);
            setIsRolling(false);
        }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-[70] overflow-y-auto"
      >
        <div className="container mx-auto px-4 py-8 max-w-4xl">
             <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                    <Trophy className="text-yellow-500" /> Painel Admin
                </h2>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Stats */}
                <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                    <h3 className="text-gray-400 font-bold uppercase text-xs mb-4">Total de Membros</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black text-white">{members.length}</span>
                        <span className="text-sm text-gray-500 mb-1 font-bold">inscritos</span>
                    </div>
                </div>

                <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                    <h3 className="text-gray-400 font-bold uppercase text-xs mb-4">Sorteio Rápido</h3>
                    
                    <div className="flex gap-2 mb-4">
                        <select 
                            value={filterTier}
                            onChange={(e) => setFilterTier(e.target.value)}
                            className="bg-black border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-600 flex-1"
                        >
                            <option value="all">Todos os Níveis</option>
                            <option value="bronze">Bronze</option>
                            <option value="prata">Prata</option>
                            <option value="ouro">Ouro</option>
                            <option value="diamante">Diamante</option>
                        </select>
                        <button 
                            onClick={handleRaffle}
                            disabled={isRolling || filteredMembers.length === 0}
                            className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold uppercase px-4 py-2 rounded text-xs transition-colors disabled:opacity-50"
                        >
                            {isRolling ? 'Sorteando...' : 'Sortear'}
                        </button>
                    </div>

                    {winner && (
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`p-4 rounded border ${isRolling ? 'border-white/10 bg-neutral-800' : 'border-green-500/50 bg-green-500/10'}`}
                        >
                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                                {isRolling ? 'Sorteando...' : 'Vencedor:'}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold">
                                    {winner.full_name?.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-white leading-none">{winner.full_name}</p>
                                    <p className="text-[10px] text-gray-400">{winner.email}</p>
                                </div>
                                {!isRolling && <Trophy size={16} className="text-yellow-500 ml-auto" />}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* User List Table */}
            <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <h3 className="font-bold uppercase text-sm">Lista de Membros</h3>
                    <div className="flex items-center gap-2 text-gray-500 bg-black/40 px-3 py-1.5 rounded border border-white/5">
                        <Search size={14} />
                        <span className="text-xs">Buscar...</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-black/40 text-gray-200 font-bold">
                            <tr>
                                <th className="px-6 py-3">Nome</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Nível</th>
                                <th className="px-6 py-3">YouTube</th>
                                <th className="px-6 py-3">Desde</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredMembers.slice(0, 10).map((member) => (
                                <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{member.full_name}</td>
                                    <td className="px-6 py-4">{member.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                            member.membership_tier === 'diamante' ? 'bg-cyan-900/30 text-cyan-400' :
                                            member.membership_tier === 'ouro' ? 'bg-yellow-900/30 text-yellow-400' :
                                            'bg-gray-800 text-gray-400'
                                        }`}>
                                            {member.membership_tier || 'Free'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {member.youtube_connected ? 
                                            <span className="text-green-500"><Youtube size={16} /></span> : 
                                            <span className="text-gray-700"><Youtube size={16} /></span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-xs">
                                        {member.created_at ? new Date(member.created_at).toLocaleDateString('pt-BR') : '-'}
                                    </td>
                                </tr>
                            ))}
                            {filteredMembers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Nenhum membro encontrado neste filtro.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 text-center border-t border-white/10 text-xs text-gray-600">
                    Mostrando {Math.min(filteredMembers.length, 10)} de {filteredMembers.length} registros
                </div>
            </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;