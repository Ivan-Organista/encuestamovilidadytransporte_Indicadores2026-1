
import React, { useState, useCallback } from 'react';
import type { SurveyFormData } from './types';
import { initialFormData, formSections } from './constants';

const App: React.FC = () => {
    const [formData, setFormData] = useState<SurveyFormData>(initialFormData);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = useCallback((section: keyof SurveyFormData, key: string, value: any) => {
        setFormData(prev => {
            const sectionData = prev[section];
            if (typeof sectionData === 'object' && sectionData !== null && !Array.isArray(sectionData)) {
                return { ...prev, [section]: { ...sectionData, [key]: value } };
            }
            return { ...prev, [key as keyof SurveyFormData]: value };
        });
    }, []);

    const handleNestedInputChange = useCallback(<T extends keyof SurveyFormData>(
        section: T,
        key: keyof SurveyFormData[T],
        subKey: keyof SurveyFormData[T][keyof SurveyFormData[T]],
        value: any
    ) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: {
                    ...(prev[section] as any)[key],
                    [subKey]: value,
                },
            },
        }));
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Survey Data:', formData);
        setSubmitted(true);
        window.scrollTo(0, 0);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-2xl mx-auto">
                    <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h1 className="text-4xl font-bold text-gray-800 mt-6">¡Gracias!</h1>
                    <p className="text-gray-600 mt-4 text-lg">Tu encuesta ha sido enviada con éxito.</p>
                    <p className="text-gray-500 mt-2">Tus respuestas son totalmente confidenciales y solo se utilizarán con fines estadísticos.</p>
                    <button onClick={() => { setSubmitted(false); setFormData(initialFormData); }} className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                        Enviar otra respuesta
                    </button>
                </div>
            </div>
        );
    }
    
    const renderQuestion = (question: any) => {
        switch (question.type) {
            case 'text':
            case 'number':
            case 'email':
                return (
                    <input
                        type={question.type}
                        placeholder="Tu respuesta"
                        className="w-full md:w-1/2 mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                        value={(formData as any)[question.id]}
                        onChange={(e) => handleInputChange(question.section, question.id, e.target.value)}
                        required={question.required}
                    />
                );
            case 'radio':
                return (
                    <div className="mt-2 space-y-2">
                        {question.options.map((option: string) => (
                            <label key={option} className="flex items-center p-3 rounded-md hover:bg-indigo-50 cursor-pointer transition-colors">
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    checked={(formData as any)[question.id] === option}
                                    onChange={(e) => handleInputChange(question.section, question.id, e.target.value)}
                                    required={question.required}
                                />
                                <span className="ml-3 text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'textarea':
                return (
                     <textarea
                        placeholder="Tu respuesta"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow min-h-[120px]"
                        value={(formData as any)[question.id]}
                        onChange={(e) => handleInputChange(question.section, question.id, e.target.value)}
                        required={question.required}
                    />
                );
            case 'ranking':
                return (
                    <div className="mt-4 space-y-3">
                        <p className="text-sm text-gray-500">{question.instruction}</p>
                        {question.items.map((item: string) => (
                            <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <label className="text-gray-700 flex-1">{item}</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={question.maxRank}
                                    className="w-20 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-indigo-500"
                                    value={(formData as any)[question.section][item] || ''}
                                    onChange={(e) => handleInputChange(question.section, item, e.target.value ? parseInt(e.target.value) : '')}
                                />
                            </div>
                        ))}
                    </div>
                );
            case 'rating-scale':
                 return (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-3 px-4 bg-gray-50 font-semibold text-gray-600 border-b">Aspecto</th>
                                    <th className="py-3 px-4 bg-gray-50 font-semibold text-gray-600 border-b text-center">Calificación (1-10)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {question.items.map((item: {id: string, label: string}) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border-b">{item.label}</td>
                                        <td className="py-3 px-4 border-b text-center">
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                className="w-24 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-indigo-500"
                                                value={(formData as any)[question.section][item.id] || ''}
                                                onChange={(e) => handleInputChange(question.section, item.id, e.target.value ? parseInt(e.target.value) : '')}
                                                required={question.required}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'check-and-count':
                return (
                     <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-3 px-4 bg-gray-50 font-semibold text-gray-600 border-b">Incidente</th>
                                    <th className="py-3 px-4 bg-gray-50 font-semibold text-gray-600 border-b text-center">Ocurrido (Sí)</th>
                                    <th className="py-3 px-4 bg-gray-50 font-semibold text-gray-600 border-b text-center">Cuántas veces</th>
                                </tr>
                            </thead>
                            <tbody>
                                {question.items.map((item: string) => (
                                    <tr key={item} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border-b">{item}</td>
                                        <td className="py-3 px-4 border-b text-center">
                                            <input
                                                type="checkbox"
                                                className="h-6 w-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                checked={(formData as any)[question.section][item]?.happened || false}
                                                onChange={(e) => handleNestedInputChange(question.section, item, 'happened', e.target.checked)}
                                            />
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-full p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-indigo-500"
                                                value={(formData as any)[question.section][item]?.times || ''}
                                                onChange={(e) => handleNestedInputChange(question.section, item, 'times', e.target.value ? parseInt(e.target.value) : '')}
                                                disabled={!(formData as any)[question.section][item]?.happened}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'grid-radio':
                 return (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-3 px-2 bg-gray-50 font-semibold text-gray-600 border">Frecuencia</th>
                                    {question.columns.map((col: string) => <th key={col} className="py-3 px-2 bg-gray-50 font-semibold text-gray-600 border">{col}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {question.rows.map((row: string) => (
                                    <tr key={row} className="hover:bg-gray-50">
                                        <td className="py-3 px-2 border font-medium text-gray-700 text-left">{row}</td>
                                        {question.columns.map((col: string) => (
                                            <td key={col} className="py-3 px-2 border">
                                                <input
                                                    type="radio"
                                                    name={question.id}
                                                    value={`${row}_${col}`}
                                                    className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                    checked={formData.delayFrequencyDuration === `${row}_${col}`}
                                                    onChange={(e) => handleInputChange(question.section, question.id, e.target.value)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 );
            default:
                return null;
        }
    };
    
    const renderConditionalQuestion = (condition: boolean, question: any) => {
        if (!condition) return null;
        return (
            <div className="mt-6 ml-4 pl-4 border-l-2 border-indigo-200">
                <h3 className="text-md font-semibold text-gray-800">{question.label}</h3>
                {renderQuestion(question)}
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-slate-100 font-sans text-gray-800">
            <main className="max-w-4xl mx-auto p-4 md:p-8">
                <div className="bg-white rounded-t-lg shadow-md border-t-8 border-indigo-600 p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Encuesta de movilidad y transporte</h1>
                    <p className="mt-4 text-gray-600">
                        Soy estudiante de la asignatura de Indicadores y queremos conocer la percepción de los usuarios en cuanto al transporte y su movilidad. El cuestionario solo le llevará unos minutos y sus respuestas son totalmente confidenciales y solo se utilizarán con fines estadísticos.
                    </p>
                    <p className="mt-2 text-gray-600">
                        <strong>Obj.</strong> Conocer la perspectiva del usuario del transporte en términos de la comodidad, limpieza, seguridad, confiabilidad, atrasos, precio-distancia, precio-calidad, horario.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    {formSections.map(section => (
                        <div key={section.title} className="mt-4">
                             <div className="bg-white rounded-lg shadow-md p-8">
                                <h2 className="text-2xl font-bold text-gray-900 border-b pb-4 mb-6">{section.title}</h2>
                                {section.questions.map(question => (
                                    <div key={question.id} className="mb-8">
                                        <label className="text-lg font-semibold text-gray-800">
                                            {question.number ? `${question.number}. ` : ''}{question.label}
                                            {question.required && <span className="text-red-500 ml-1">*</span>}
                                        </label>
                                        <p className="text-sm text-gray-500 mb-2">{question.description}</p>
                                        {renderQuestion(question)}
                                        {question.children?.map(child => renderConditionalQuestion((formData as any)[question.id] === child.showWhen, child))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 mt-4 rounded-lg shadow-lg flex justify-end">
                         <button type="submit" className="bg-indigo-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 shadow-md">
                            Enviar encuesta
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default App;
