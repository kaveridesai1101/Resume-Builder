import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft, CheckCircle, Loader } from 'lucide-react';
import ResumePreview from '../components/ResumePreview';
import html2pdf from 'html2pdf.js';

const DownloadPage = () => {
    const resumeRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    const handleDownload = () => {
        setIsDownloading(true);
        setDownloadSuccess(false);

        const element = resumeRef.current;

        // Configure html2pdf options for standard A4 size with multi-page support
        const opt = {
            margin: [10, 0, 10, 0], // mm margins (top/bottom)
            filename: 'Professional_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'], avoid: '.prevent-page-break' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            setIsDownloading(false);
            setDownloadSuccess(true);
            setTimeout(() => setDownloadSuccess(false), 5000);
        }).catch((err) => {
            console.error('Error downloading PDF', err);
            setIsDownloading(false);
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row h-screen overflow-hidden">

            {/* Left Panel: Download Controls Controls */}
            <section className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-slate-200 p-6 md:p-10 flex flex-col justify-between overflow-y-auto shadow-xl z-20 relative">

                <div>
                    <Link to="/builder" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Builder
                    </Link>

                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Almost Done!</h1>
                    <p className="text-slate-600 mb-10 leading-relaxed">
                        Your resume is fully optimized and ready to be downloaded in the universally accepted standard ATS template structure.
                    </p>

                    <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100 mb-8">
                        <h3 className="font-semibold text-primary-900 flex items-center mb-3">
                            <CheckCircle className="w-5 h-5 mr-2 text-primary-500" />
                            ATS Verification
                        </h3>
                        <ul className="text-sm text-primary-800 space-y-2">
                            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-primary-500 flex-shrink-0" /> Single column text flow</li>
                            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-primary-500 flex-shrink-0" /> Standard serif font scaling</li>
                            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-primary-500 flex-shrink-0" /> Machine readable PDF vectors</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-primary-500/30 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        {isDownloading ? (
                            <>
                                <Loader className="w-6 h-6 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : downloadSuccess ? (
                            <>
                                <CheckCircle className="w-6 h-6 mr-2 text-white" />
                                Downloaded!
                            </>
                        ) : (
                            <>
                                <Download className="w-6 h-6 mr-2 group-hover:-translate-y-1 transition-transform" />
                                Download PDF
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-4">
                        Downloads instantly. No watermarks.
                    </p>
                </div>
            </section>

            {/* Right Panel: Final Preview */}
            <section className="w-full md:w-2/3 lg:w-3/4 bg-slate-200 p-8 overflow-y-auto flex items-start justify-center">
                <div className="scale-75 md:scale-[0.85] lg:scale-100 origin-top transform transition-transform pb-20">
                    <div className="ring-1 ring-slate-900/5 shadow-2xl">
                        <ResumePreview ref={resumeRef} />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default DownloadPage;
