'use client'
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Define the shape of the form data (omitted for brevity)
interface ContactForm { name: string; email: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }

// --- Contact Details Data (Easily editable) ---
const contactInfo = [
    { icon: <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, text: "nahid96hossain@gmail.com", href: "mailto:nahid96hossain@gmail.com" },
    { icon: <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, text: " 01864322827", href: "mobile: 01864322827" },
    { icon: <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, text: "Dhaka, Bangladesh", href: "#" },
];

// --- Main Contact Component ---
const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactForm>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) { newErrors.email = "Email is required."; }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "Email address is invalid."; }
        if (!formData.message) newErrors.message = "Message is required.";
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setSubmitMessage(null);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            setIsSubmitting(false);
            setSubmitMessage('🎉 Thank you! Your message has been sent successfully.');
            setFormData({ name: '', email: '', message: '' });
        }
    };

    // NEW STYLING: Removed border and added border-b-2 for an underline effect
    const getFormClass = (name: keyof ContactForm) => (
        `w-full p-3 bg-transparent border-b-2 rounded-none focus:outline-none transition-all duration-200 
    ${errors[name]
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500'
        }`
    );

    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12 border-b-4 border-indigo-500 pb-2 inline-block mx-auto">
                    Get In Touch
                </h2>

                {/* Content Wrapper */}
                <div className="md:flex md:space-x-10">

                    {/* --- Contact Form --- */}
                    <div className="md:w-2/3">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send Me a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-8"> {/* Increased spacing for open feel */}

                            {/* Fields use the new underline style */}
                            <div><input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={getFormClass('name')} disabled={isSubmitting} />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}</div>

                            <div><input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={getFormClass('email')} disabled={isSubmitting} />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}</div>

                            <div><textarea name="message" placeholder="Your Message" rows={4} value={formData.message} onChange={handleChange} className={getFormClass('message')} disabled={isSubmitting} />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}</div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={Object.keys(errors).length > 0 || isSubmitting}
                                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 text-lg font-bold rounded-lg transition-colors duration-300
                  ${isSubmitting || Object.keys(errors).length > 0
                                        ? 'bg-indigo-400 cursor-not-allowed'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <><span className="animate-spin h-5 w-5 border-2 border-t-2 border-white rounded-full"></span><span>Sending...</span></>
                                ) : (
                                    <><Send className="w-5 h-5" /><span>Send Message</span></>
                                )}
                            </button>
                        </form>

                        {/* Submission Message (Kept as a clearly defined alert box) */}
                        {submitMessage && (
                            <p className={`mt-6 text-center font-semibold p-3 rounded-lg ${submitMessage.startsWith('🎉') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                {submitMessage}
                            </p>
                        )}
                    </div>

                    {/* --- Contact Details (Sidebar) --- */}
                    <div className="md:w-1/3 mt-10 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 md:border-l-0 border-gray-200 dark:border-gray-700 md:pl-8">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Info</h3>

                        <ul className="space-y-5">
                            {contactInfo.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="flex-shrink-0 mr-3 mt-1">{item.icon}</span>
                                    <a href={item.href} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium" target="_blank" rel="noopener noreferrer">
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;