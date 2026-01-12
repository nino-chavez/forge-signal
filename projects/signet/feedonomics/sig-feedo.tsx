import React, { useState } from 'react';
import { 
  Database, 
  Server, 
  ArrowRight, 
  Cpu, 
  Globe, 
  ShoppingCart, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  Search, 
  FileText,
  TrendingUp,
  Info,
  X,
  Loader2,
  MessageSquare,
  Wand2
} from 'lucide-react';

// --- Gemini API Helper ---
const apiKey = ""; // System provides this at runtime

const callGemini = async (prompt, systemInstruction = "") => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error interacting with AI. Please try again.";
  }
};

// --- Modals ---

const EnrichmentModal = ({ isOpen, onClose }) => {
  const [rawData, setRawData] = useState('{"sku": "RG-102", "nm": "gld rng 14k", "desc": "womens ring shiny size 6"}');
  const [enrichedData, setEnrichedData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnrich = async () => {
    setLoading(true);
    const systemPrompt = `You are Feedonomics, an advanced AI data enrichment engine for Signet Jewelers. 
    Your goal is to take raw, messy product data and transform it into a "Golden Record".
    1. Fix spelling and capitalization.
    2. Expand abbreviations (e.g., "gld" -> "Gold").
    3. Write a persuasive "Romance Copy" description.
    4. Extract structured attributes.
    Output ONLY valid JSON format.`;
    
    const result = await callGemini(`Enrich this raw data: ${rawData}`, systemPrompt);
    setEnrichedData(result);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-300" />
            <h2 className="font-bold text-lg">Feedonomics AI Enrichment Simulator</h2>
          </div>
          <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded"><X size={20} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-slate-700 flex items-center gap-2">
              <Database size={16} /> Raw Source Data (Input)
            </label>
            <textarea 
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
              className="flex-1 min-h-[300px] p-4 font-mono text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
             <label className="font-bold text-slate-700 flex items-center gap-2">
              <RefreshCw size={16} className="text-green-600" /> Enriched Output (Gemini Powered)
            </label>
            <div className="flex-1 min-h-[300px] bg-slate-900 text-green-400 p-4 font-mono text-xs rounded-lg overflow-auto relative border border-slate-800">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                   <Loader2 className="animate-spin text-blue-400" size={32} />
                </div>
              ) : (
                <pre className="whitespace-pre-wrap">{enrichedData || "// Click 'Run Enrichment' to see the AI magic..."}</pre>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button 
            onClick={handleEnrich}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : '✨ Run AI Enrichment'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AgenticSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("I'm looking for an engagement ring under $3000, something classic.");
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const systemPrompt = `You are a helpful shopping assistant (like ChatGPT or Perplexity) that has access to Signet Jewelers' structured product feed provided by Feedonomics.
    Answer the user's shopping query enthusiastically.
    Recommend 2-3 specific types of jewelry that match their request, citing specific "attributes" like metal type, stone cut, or price range.
    Mention that these results are pulled from "Real-time Inventory".`;
    
    const result = await callGemini(`User Query: ${query}`, systemPrompt);
    setResponse(result);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-purple-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-purple-200" />
            <h2 className="font-bold text-lg">Agentic Search Simulator</h2>
          </div>
          <button onClick={onClose} className="hover:bg-purple-700 p-1 rounded"><X size={20} /></button>
        </div>
        
        <div className="p-6 flex flex-col gap-4">
           <div className="flex gap-2">
             <input 
               type="text" 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
               placeholder="Ask a shopping question..."
             />
             <button 
               onClick={handleSearch}
               disabled={loading}
               className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg font-bold disabled:opacity-50"
             >
               {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
             </button>
           </div>

           <div className="bg-slate-50 rounded-xl p-4 min-h-[200px] border border-slate-200">
              {loading ? (
                 <div className="flex items-center gap-2 text-slate-400 italic">
                    <Sparkles size={16} className="animate-pulse" /> AI is searching the catalog...
                 </div>
              ) : response ? (
                <div className="prose prose-sm max-w-none">
                   <div className="flex items-center gap-2 mb-2 text-purple-700 font-bold text-xs uppercase tracking-wider">
                      <Sparkles size={12} /> Generated Response
                   </div>
                   <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">{response}</p>
                </div>
              ) : (
                <div className="text-slate-400 text-center mt-10">
                   Try asking: "Find me a gold necklace for my mom"
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Diagram ---

const ArchitectureDiagram = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [showEnrichment, setShowEnrichment] = useState(false);
  const [showAgentic, setShowAgentic] = useState(false);

  // Tooltip content helper
  const getTooltip = (id: string) => {
    switch (id) {
      case 'feedonomics':
        return {
          title: "Feedonomics (FDX) Platform",
          desc: "Replaces 'Enterprise Intelligence Core (AWS)' & 'Signet AI Hub'. Acts as the unified engine for ingestion, AI enrichment, and syndication.",
          value: "Managed Service, AI-Native, Reduced Tech Debt"
        };
      case 'sources':
        return {
          title: "Unified Ingestion",
          desc: "Ingests structured (Catalog) and unstructured data (Profound AI, Reviews) directly, removing the need for complex 'Integration Services (ESI)'.",
          value: "Agile Data Onboarding"
        };
      case 'pim':
        return {
          title: "Infoverity PIM",
          desc: "Receives the fully enriched, AI-optimized 'Golden Record' from Feedonomics. No longer needs to manage the copywriting flow plugins internally.",
          value: "Single Source of Truth"
        };
      case 'agentic':
        return {
          title: "Agentic Search Channels",
          desc: "New capability to syndicate directly to LLMs (ChatGPT, Perplexity) alongside traditional channels.",
          value: "Future-Proofing"
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
      
      <EnrichmentModal isOpen={showEnrichment} onClose={() => setShowEnrichment(false)} />
      <AgenticSearchModal isOpen={showAgentic} onClose={() => setShowAgentic(false)} />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Signet Jewelers: Future State Data Architecture</h1>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Consolidated architecture where <span className="font-semibold text-blue-600">Feedonomics</span> replaces the custom AI Hub & AWS Core,
          providing a closed-loop enrichment cycle into Infoverity PIM.
        </p>
      </div>

      {/* Legend / Comparison Bar */}
      <div className="max-w-6xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-400 flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full text-red-600"><Server size={18} /></div>
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Removed</span>
            <p className="text-sm font-medium">AWS Intelligence Core & Custom AI Hub</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 flex items-center gap-3">
           <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Cpu size={18} /></div>
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Implemented</span>
            <p className="text-sm font-medium">Feedonomics AI Enrichment</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500 flex items-center gap-3">
           <div className="bg-purple-100 p-2 rounded-full text-purple-600"><Sparkles size={18} /></div>
          <div>
            <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Outcome</span>
            <p className="text-sm font-medium">Enriched Data Pushed Back to PIM</p>
          </div>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8 overflow-hidden relative border border-slate-200">
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
        </div>

        {/* Diagram Flex Layout */}
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-8">

          {/* COLUMN 1: Source Systems */}
          <div 
            className="flex-1 flex flex-col gap-4 justify-center group cursor-pointer"
            onMouseEnter={() => setActiveTooltip('sources')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">Data Sources</h3>
            
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm hover:border-blue-400 transition-all relative">
              <div className="absolute -left-2 top-1/2 w-1 h-12 bg-purple-600 rounded-r transform -translate-y-1/2"></div>
              <div className="flex items-center gap-3 mb-2">
                <Search className="text-purple-600" size={20} />
                <span className="font-bold text-slate-700">Profound AI</span>
              </div>
              <p className="text-xs text-slate-500">Agent Analytics & Context</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm hover:border-blue-400 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Database className="text-slate-600" size={20} />
                <span className="font-bold text-slate-700">Product Catalog</span>
              </div>
              <p className="text-xs text-slate-500">Raw ERP Data</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm hover:border-blue-400 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-green-600" size={20} />
                <span className="font-bold text-slate-700">Analytics</span>
              </div>
              <p className="text-xs text-slate-500">Google / Site Analytics</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm hover:border-blue-400 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="text-orange-600" size={20} />
                <span className="font-bold text-slate-700">Reviews</span>
              </div>
              <p className="text-xs text-slate-500">BazaarVoice</p>
            </div>
          </div>

          {/* Connector Arrow */}
          <div className="hidden lg:flex flex-col justify-center items-center px-2">
            <div className="relative w-full h-[2px] bg-slate-300 w-16">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-100 px-2 text-[10px] text-slate-500 font-medium whitespace-nowrap">
                Raw Data
              </div>
              <ArrowRight className="absolute -right-2 -top-[9px] text-slate-300" />
            </div>
          </div>

          {/* COLUMN 2: The Feedonomics Engine (The Solution) */}
          <div 
            className="flex-[1.5] flex flex-col justify-center relative"
            onMouseEnter={() => setActiveTooltip('feedonomics')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
             <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 text-center">Enrichment & Intelligence Layer</h3>
             
             {/* Main Box */}
             <div className="bg-gradient-to-b from-blue-50 to-white border-2 border-blue-500 rounded-xl shadow-lg p-6 relative overflow-hidden group hover:shadow-blue-100/50 transition-all">
                {/* Decorative internal layout */}
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-600 text-white p-2 rounded-lg">
                      <RefreshCw size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Feedonomics</h2>
                      <p className="text-xs text-slate-500">Hosted AI & Syndication Platform</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">Managed Service</span>
                </div>

                {/* Internal Processes */}
                <div className="space-y-3 mb-6">
                  <div className="bg-white border border-blue-100 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Layers size={16} className="text-blue-400"/>
                      <span className="text-sm font-medium text-slate-700">Data Ingestion & Normalization</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-600 text-white rounded-lg p-4 shadow-md relative overflow-hidden">
                    <div className="relative z-10 flex flex-col gap-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={16} className="text-yellow-300 animate-pulse"/>
                        <span className="font-bold text-sm">AI Native Enrichment</span>
                      </div>
                      <p className="text-xs text-blue-100 ml-6">• Generative Romance Copy</p>
                      <p className="text-xs text-blue-100 ml-6">• Attribute Extraction & Completion</p>
                      <p className="text-xs text-blue-100 ml-6">• LLM Optimization</p>
                    </div>
                  </div>

                  <div className="bg-white border border-blue-100 rounded-lg p-3 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                      <Globe size={16} className="text-blue-400"/>
                      <span className="text-sm font-medium text-slate-700">Channel Syndication Logic</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowEnrichment(true); }}
                  className="w-full py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Wand2 size={16} /> Simulator: Try AI Enrichment ✨
                </button>

                {/* Replacement Label */}
                <div className="mt-6 pt-4 border-t border-dashed border-slate-200 text-center">
                  <p className="text-xs text-slate-400 italic">Replaces AWS Intelligence Core & Signet AI Hub</p>
                </div>
             </div>
          </div>

           {/* Connector Arrows Split */}
           <div className="hidden lg:flex flex-col justify-center items-center px-2 gap-16">
              {/* Top Arrow to PIM */}
              <div className="relative w-16 h-[2px] bg-blue-500">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[10px] text-blue-600 font-bold whitespace-nowrap bg-white px-1">
                  Enriched Data
                </div>
                <ArrowRight className="absolute -right-2 -top-[9px] text-blue-500" />
              </div>

              {/* Bottom Arrow (faint) to Search */}
              <div className="relative w-16 h-[2px] bg-purple-300 border-t border-dashed">
                <ArrowRight className="absolute -right-2 -top-[9px] text-purple-300" />
              </div>
          </div>

          {/* COLUMN 3: Destinations */}
          <div className="flex-1 flex flex-col gap-6 justify-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">Destinations</h3>

            {/* PIM Node */}
            <div 
              className="bg-slate-800 text-white border border-slate-700 p-6 rounded-xl shadow-xl relative group cursor-pointer"
              onMouseEnter={() => setActiveTooltip('pim')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1 rounded-full z-20 border-4 border-white">
                <ArrowRight size={12} />
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <Database size={24} className="text-blue-400" />
                <div>
                  <h3 className="font-bold text-lg">Infoverity PIM</h3>
                  <p className="text-xs text-slate-400">Golden Record Storage</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-slate-700/50 rounded p-2 text-xs text-slate-300 flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                   AI Enriched Titles & Desc.
                </div>
                <div className="bg-slate-700/50 rounded p-2 text-xs text-slate-300 flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                   Complete Attributes
                </div>
              </div>
              
              {/* Out to Storefront */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="h-8 w-[2px] bg-slate-300"></div>
                  <div className="bg-white border border-slate-300 rounded px-3 py-1 text-xs shadow-sm flex items-center gap-1 whitespace-nowrap">
                    <ShoppingCart size={10} /> Hybris Storefront
                  </div>
              </div>
            </div>

             {/* Agentic Search Node */}
             <div 
               className="bg-purple-50 border border-purple-100 p-5 rounded-xl shadow-sm mt-8 relative group cursor-pointer"
               onMouseEnter={() => setActiveTooltip('agentic')}
               onMouseLeave={() => setActiveTooltip(null)}
             >
               <div className="absolute -top-3 right-4 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                 NEW Capability
               </div>
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Agentic Search</h3>
                    <p className="text-xs text-slate-500">AI Ecosystem</p>
                  </div>
               </div>
               <div className="flex gap-2 mt-2 mb-4">
                  <span className="px-2 py-1 bg-white border border-purple-200 rounded text-[10px] text-purple-800">ChatGPT</span>
                  <span className="px-2 py-1 bg-white border border-purple-200 rounded text-[10px] text-purple-800">Gemini</span>
                  <span className="px-2 py-1 bg-white border border-purple-200 rounded text-[10px] text-purple-800">Perplexity</span>
               </div>

               {/* Action Button */}
               <button 
                  onClick={(e) => { e.stopPropagation(); setShowAgentic(true); }}
                  className="w-full py-2 bg-purple-100 border border-purple-200 rounded-lg text-purple-700 font-bold text-xs hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={14} /> Test Agentic Query ✨
                </button>
             </div>

          </div>

        </div>

        {/* Hover Info Box (Dynamic) */}
        {activeTooltip && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 bg-slate-900/95 text-white p-4 rounded-lg shadow-2xl backdrop-blur-sm border border-slate-700 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-start gap-4">
               <Info className="text-blue-400 shrink-0 mt-1" />
               <div>
                 <h4 className="font-bold text-lg text-blue-100 mb-1">{getTooltip(activeTooltip)?.title}</h4>
                 <p className="text-sm text-slate-300 mb-2">{getTooltip(activeTooltip)?.desc}</p>
                 <div className="inline-block bg-blue-900/50 px-2 py-1 rounded text-xs font-mono text-blue-300 border border-blue-800">
                    Value: {getTooltip(activeTooltip)?.value}
                 </div>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ArchitectureDiagram;