import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Scale, 
  Download, 
  ArrowRight, 
  Search, 
  Calendar,
  Eye,
  AlertTriangle,
  X,
  Sparkles,
  Layers
} from 'lucide-react';
import { DecisionRecord } from '../types';

interface HistoryViewProps {
  records: DecisionRecord[];
  onSelectRecord: (record: DecisionRecord) => void;
  onDeleteRecord: (id: string) => void;
  onExportHistory: () => void;
  onNewAnalysis: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  records,
  onSelectRecord,
  onDeleteRecord,
  onExportHistory,
  onNewAnalysis,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const filteredRecords = records.filter(
    (r) =>
      r.input.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.input.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.input.tags || []).some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare((prev) => prev.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], id]);
      } else {
        setSelectedForCompare((prev) => [...prev, id]);
      }
    }
  };

  const compareRecord1 = records.find((r) => r.id === selectedForCompare[0]);
  const compareRecord2 = records.find((r) => r.id === selectedForCompare[1]);

  return (
    <div className="bg-[#F6F7FC] min-h-[calc(100vh-4rem)] py-8 text-[#20243A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#6C4CF1] bg-[#F0EDFF] px-2.5 py-1 rounded-full mb-1">
              <History className="w-3.5 h-3.5" />
              <span>Decisions Repository</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20243A]">
              Decision History & Comparison
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Revisit previous unbiasing reports or compare two decisions side-by-side to understand trade-offs.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {records.length > 0 && (
              <button
                onClick={onExportHistory}
                className="flex items-center space-x-1.5 bg-white border border-gray-200 text-[#20243A] hover:text-[#6C4CF1] hover:border-[#6C4CF1] px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shadow-2xs"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON Backup</span>
              </button>
            )}

            <button
              onClick={onNewAnalysis}
              className="bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-102"
            >
              Analyze New Decision
            </button>
          </div>
        </div>

        {/* Search & Compare Notice */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search past decisions by keyword or tag..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/20 focus:border-[#6C4CF1] transition-all"
            />
          </div>

          {selectedForCompare.length > 0 && (
            <div className="flex items-center space-x-3 bg-[#F0EDFF] text-[#6C4CF1] border border-[#6C4CF1]/20 px-4 py-2 rounded-xl text-xs font-semibold">
              <Scale className="w-4 h-4" />
              <span>{selectedForCompare.length} selected for comparison</span>
              {selectedForCompare.length === 2 && (
                <button
                  onClick={() => setIsComparing(true)}
                  className="bg-[#6C4CF1] text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-[#9275FF] transition-colors ml-2 shadow-2xs"
                >
                  View Side-by-Side Comparison
                </button>
              )}
              <button
                onClick={() => setSelectedForCompare([])}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Side-by-Side Comparison Modal / View */}
        {isComparing && compareRecord1 && compareRecord2 && (
          <div className="bg-white rounded-2xl border-2 border-[#6C4CF1] p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-[#6C4CF1]" />
                <h2 className="text-lg font-bold text-[#20243A]">
                  Side-by-Side Decision Comparison
                </h2>
              </div>
              <button
                onClick={() => setIsComparing(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A */}
              <div className="bg-[#F6F7FC] p-5 rounded-2xl border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#6C4CF1] bg-[#F0EDFF] px-2.5 py-0.5 rounded">
                    Decision A
                  </span>
                  <button
                    onClick={() => onSelectRecord(compareRecord1)}
                    className="text-xs font-semibold text-[#6C4CF1] hover:underline"
                  >
                    View Full Analysis &rarr;
                  </button>
                </div>
                <h3 className="text-base font-bold text-[#20243A]">
                  {compareRecord1.input.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {compareRecord1.analysis?.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#6C4CF1] block">Core Blind Spots:</span>
                  {(compareRecord1.analysis?.blind_spots || []).slice(0, 3).map((b) => (
                    <div key={b.id} className="bg-white p-2.5 rounded-xl border border-gray-200 text-xs text-[#20243A]">
                      <strong>{b.title}:</strong> {b.description}
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-rose-700 block">Primary Risk:</span>
                  <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100 text-xs text-rose-900">
                    {compareRecord1.analysis?.risks?.[0]?.risk || 'No high risks evaluated'}
                  </div>
                </div>
              </div>

              {/* Option B */}
              <div className="bg-[#F6F7FC] p-5 rounded-2xl border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#39D5F6] bg-[#39D5F6]/10 px-2.5 py-0.5 rounded border border-[#39D5F6]/30">
                    Decision B
                  </span>
                  <button
                    onClick={() => onSelectRecord(compareRecord2)}
                    className="text-xs font-semibold text-[#6C4CF1] hover:underline"
                  >
                    View Full Analysis &rarr;
                  </button>
                </div>
                <h3 className="text-base font-bold text-[#20243A]">
                  {compareRecord2.input.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {compareRecord2.analysis?.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#6C4CF1] block">Core Blind Spots:</span>
                  {(compareRecord2.analysis?.blind_spots || []).slice(0, 3).map((b) => (
                    <div key={b.id} className="bg-white p-2.5 rounded-xl border border-gray-200 text-xs text-[#20243A]">
                      <strong>{b.title}:</strong> {b.description}
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-rose-700 block">Primary Risk:</span>
                  <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100 text-xs text-rose-900">
                    {compareRecord2.analysis?.risks?.[0]?.risk || 'No high risks evaluated'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Records List */}
        {filteredRecords.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center">
            <History className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#20243A]">No Decisions Found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              {searchTerm ? 'No results matched your search query.' : 'You have not analyzed any decisions yet.'}
            </p>
            <button
              onClick={onNewAnalysis}
              className="bg-[#6C4CF1] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#9275FF]"
            >
              Start First Analysis
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecords.map((record) => {
              const isSelected = selectedForCompare.includes(record.id);
              const dateStr = new Date(record.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={record.id}
                  className={`bg-white p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    isSelected ? 'border-2 border-[#6C4CF1] shadow-md' : 'border-gray-200 shadow-xs hover:border-[#6C4CF1]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 font-mono flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{dateStr}</span>
                        </span>
                        {record.analysis?.isDemo && (
                          <span className="text-[10px] font-bold uppercase bg-[#39D5F6]/10 text-[#0284C7] border border-[#39D5F6]/30 px-2 py-0.5 rounded-full">
                            Benchmark Demo
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleCompare(record.id)}
                          className={`text-[11px] font-semibold px-2 py-1 rounded-lg border transition-colors ${
                            isSelected
                              ? 'bg-[#6C4CF1] text-white border-[#6C4CF1]'
                              : 'text-gray-600 bg-gray-50 border-gray-200 hover:border-[#6C4CF1]'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Compare'}
                        </button>
                        <button
                          onClick={() => onDeleteRecord(record.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete Decision"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 
                      onClick={() => onSelectRecord(record)}
                      className="text-base font-bold text-[#20243A] hover:text-[#6C4CF1] cursor-pointer transition-colors mb-2"
                    >
                      {record.input.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                      {record.analysis?.summary || record.input.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="text-[10px] bg-[#6C4CF1]/10 text-[#6C4CF1] border border-[#6C4CF1]/20 px-2 py-0.5 rounded font-semibold">
                        {record.analysis?.blind_spots?.length || 0} Blind Spots
                      </span>
                      <span className="text-[10px] bg-[#9275FF]/10 text-[#6C4CF1] border border-[#9275FF]/20 px-2 py-0.5 rounded font-semibold">
                        {record.analysis?.hidden_assumptions?.length || 0} Assumptions
                      </span>
                      <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded">
                        {record.analysis?.risks?.length || 0} Risks
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectRecord(record)}
                      className="text-xs font-bold text-[#6C4CF1] hover:text-[#9275FF] flex items-center space-x-1"
                    >
                      <span>Open Full Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
