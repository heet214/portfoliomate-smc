// =================================================================================
// FILE: src/components/CustomSelect.jsx
// This file should be created at src/components/CustomSelect.jsx
// =================================================================================
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChevronDownIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<polyline points="6 9 12 15 18 9"></polyline>
	</svg>
);

const CustomSelect = ({ id, label, options, value, onChange, error }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const selectRef = useRef(null);

	const filteredOptions = useMemo(() => options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase())), [options, searchTerm]);

	const handleSelect = optionValue => {
		onChange(optionValue);
		setIsOpen(false);
		setSearchTerm("");
	};

	useEffect(() => {
		const handleClickOutside = event => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const selectedLabel = options.find(opt => opt.value === value)?.label || "Select an option...";

	return (
		<div className="relative mb-4" ref={selectRef}>
			<label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
				{label}
			</label>
			<div className="relative">
				<button type="button" onClick={() => setIsOpen(!isOpen)} className={`w-full px-4 py-2 bg-gray-50 border rounded-lg text-left flex justify-between items-center ${error ? "border-red-500" : "border-gray-300"}`}>
					<span className={value ? "text-gray-900" : "text-gray-500"}>{selectedLabel}</span>
					<ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
				</button>
				<AnimatePresence>
					{isOpen && (
						<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
							<div className="p-2">
								<input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4340a0]" />
							</div>
							<ul>
								{filteredOptions.map(option => (
									<li key={option.value} onClick={() => handleSelect(option.value)} className="px-4 py-2 hover:bg-[#EBEAF2] cursor-pointer">
										{option.label}
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			{error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
		</div>
	);
};
export default CustomSelect;
