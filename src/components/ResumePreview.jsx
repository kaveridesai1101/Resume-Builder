import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Phone, Mail, Linkedin, Github, Download, Loader } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const ResumePreview = React.forwardRef((props, ref) => {
    const { resumeData } = useResume();
    const { personal, education, experience, projects, skills, leadership } = resumeData;
    const [isDownloading, setIsDownloading] = useState(false);

    // Split string by commas for skills
    const formatSkills = (skillString) => {
        if (!skillString) return '';
        return skillString.split(',').map(s => s.trim()).filter(s => s).join(', ');
    };

    const handleDownload = () => {
        setIsDownloading(true);
        const element = document.getElementById('resume-preview-content');

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
        }).catch((err) => {
            console.error('Error downloading PDF', err);
            setIsDownloading(false);
        });
    };

    return (
        <div className="relative group print:p-0 print:m-0 print:bg-white w-full h-full">
            <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`absolute top-4 right-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary-500/30 transition-all flex items-center print:hidden z-50 no-print ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
                {isDownloading ? (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Download className="w-4 h-4 mr-2" />
                )}
                {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
            <div
                ref={ref}
                id="resume-preview-content"
                className="ats-resume-template w-[800px] max-w-full mx-auto px-[0.5in] py-[0.5in] bg-white shadow-xl min-h-[1056px] print:shadow-none print:p-0 print:w-full print:mx-0 print:min-h-0"
                style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    color: '#000',
                    fontSize: '11pt',
                    lineHeight: '1.2'
                }}
            >
                {/* HEADER */}
                <header className="text-center mb-4">
                    <h1 className="text-[32pt] font-bold mb-0 leading-tight uppercase tracking-tight">
                        {personal.fullName || 'FIRST LAST'}
                    </h1>

                    {personal.address && (
                        <div className="text-[11pt] mt-0.5">
                            {personal.address}
                        </div>
                    )}

                    <div className="text-[11pt] flex flex-wrap justify-center items-center mt-1 text-black gap-x-3">
                        {personal.phone && (
                            <span className="flex items-center">
                                <Phone size={10} className="mr-1 fill-black" />
                                {personal.phone}
                            </span>
                        )}
                        {personal.email && (
                            <a href={`mailto:${personal.email}`} className="text-black no-underline flex items-center">
                                <Mail size={10} className="mr-1 fill-black" />
                                {personal.email}
                            </a>
                        )}
                        {personal.linkedin && (
                            <a href={`https://${personal.linkedin}`} className="text-black no-underline flex items-center">
                                <Linkedin size={10} className="mr-1 fill-black" />
                                {personal.linkedin.replace('https://', '').replace('www.', '')}
                            </a>
                        )}
                        {personal.github && (
                            <a href={`https://${personal.github}`} className="text-black no-underline flex items-center">
                                <Github size={10} className="mr-1 fill-black" />
                                {personal.github.replace('https://', '').replace('www.', '')}
                            </a>
                        )}
                    </div>
                </header>

                {/* EDUCATION */}
                {education && education.length > 0 && education[0].institution && (
                    <section className="mb-4">
                        <h2 className="text-[12pt] font-bold border-b border-black pb-[1px] mb-1.5 uppercase tracking-wide">Education</h2>
                        {education.map((item) => (
                            <div key={item.id} className="mb-2.5 prevent-page-break">
                                <div className="flex justify-between items-baseline font-bold text-[11pt]">
                                    <h3>{item.institution}</h3>
                                    <span>{item.startDate} {item.startDate && item.endDate ? '–' : ''} {item.endDate}</span>
                                </div>
                                <div className="flex justify-between items-baseline italic text-[11pt] mt-0.5">
                                    <span>{item.degree}{item.gpa && <span>, GPA: {item.gpa}</span>}</span>
                                    <span>{item.location}</span>
                                </div>
                                {item.relevantCoursework && (
                                    <div className="mt-1 text-[11pt]">
                                        <span className="font-bold">Relevant Coursework: </span>
                                        {item.relevantCoursework}
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* EXPERIENCE */}
                {experience && experience.length > 0 && experience[0].company && (
                    <section className="mb-4">
                        <h2 className="text-[12pt] font-bold border-b border-black pb-[1px] mb-1.5 uppercase tracking-wide">Experience</h2>
                        {experience.map((item) => (
                            <div key={item.id} className="mb-3 prevent-page-break">
                                <div className="flex justify-between items-baseline font-bold text-[11pt]">
                                    <h3>{item.company}</h3>
                                    <span>{item.startDate} {item.startDate && item.endDate ? '–' : ''} {item.endDate}</span>
                                </div>
                                <div className="flex justify-between items-baseline italic text-[11pt] mt-0.5">
                                    <span>{item.role}</span>
                                    <span>{item.location}</span>
                                </div>
                                <ul className="list-disc pl-[24px] mt-1 space-y-0.5">
                                    {item.description.filter(d => d.trim()).map((desc, i) => (
                                        <li key={i} className="text-[11pt] leading-snug">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* PROJECTS */}
                {projects && projects.length > 0 && projects[0].title && (
                    <section className="mb-4">
                        <h2 className="text-[12pt] font-bold border-b border-black pb-[1px] mb-1.5 uppercase tracking-wide">Projects</h2>
                        {projects.map((item) => (
                            <div key={item.id} className="mb-3 prevent-page-break">
                                <div className="flex justify-between items-baseline text-[11pt]">
                                    <div className="font-bold">
                                        {item.title}
                                        {item.technologies && (
                                            <span className="font-normal italic"> | {item.technologies}</span>
                                        )}
                                    </div>
                                    <span className="font-bold">{item.date}</span>
                                </div>
                                <ul className="list-disc pl-[24px] mt-1 space-y-0.5">
                                    {item.description.filter(d => d.trim()).map((desc, i) => (
                                        <li key={i} className="text-[11pt] leading-snug">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* TECHNICAL SKILLS */}
                {(skills.languages || skills.frameworks || skills.tools) && (
                    <section className="mb-4 prevent-page-break">
                        <h2 className="text-[12pt] font-bold border-b border-black pb-[1px] mb-1.5 uppercase tracking-wide">Technical Skills</h2>
                        <div className="text-[11pt] leading-normal space-y-0.5">
                            {skills.languages && (
                                <div>
                                    <span className="font-bold">Languages: </span>
                                    {formatSkills(skills.languages)}
                                </div>
                            )}
                            {skills.tools && (
                                <div>
                                    <span className="font-bold">Developer Tools: </span>
                                    {formatSkills(skills.tools)}
                                </div>
                            )}
                            {skills.frameworks && (
                                <div>
                                    <span className="font-bold">Technologies/Frameworks: </span>
                                    {formatSkills(skills.frameworks)}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* LEADERSHIP */}
                {leadership && leadership.length > 0 && leadership[0].organization && (
                    <section className="mb-4">
                        <h2 className="text-[12pt] font-bold border-b border-black pb-[1px] mb-1.5 uppercase tracking-wide">Leadership / Extracurricular</h2>
                        {leadership.map((item) => (
                            <div key={item.id} className="mb-3 prevent-page-break">
                                <div className="flex justify-between items-baseline font-bold text-[11pt]">
                                    <h3>{item.organization}</h3>
                                    <span>{item.startDate} {item.startDate && item.endDate ? '–' : ''} {item.endDate}</span>
                                </div>
                                <div className="flex justify-between items-baseline italic text-[11pt] mt-0.5">
                                    <span>{item.role || item.position}</span>
                                    <span>{item.location}</span>
                                </div>
                                <ul className="list-disc pl-[24px] mt-1 space-y-0.5">
                                    {item.description.filter(d => d.trim()).map((desc, i) => (
                                        <li key={i} className="text-[11pt] leading-snug">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

            </div>
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
