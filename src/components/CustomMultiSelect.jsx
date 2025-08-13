import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const XIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="18" y1="6" x2="6" y2="18"></line>
		<line x1="6" y1="6" x2="18" y2="18"></line>
	</svg>
);

const CustomMultiSelect = ({ id, label, options, value, onChange, error }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const selectRef = useRef(null);

	const filteredOptions = useMemo(() => options.filter(option => !value.includes(option.value) && option.label.toLowerCase().includes(searchTerm.toLowerCase())), [options, searchTerm, value]);

	const handleSelect = optionValue => {
		onChange([...value, optionValue]);
	};

	const handleRemove = optionValue => {
		onChange(value.filter(v => v !== optionValue));
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

	return (
		<div className="relative mb-4" ref={selectRef}>
			<label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
				{label}
			</label>
			<div className="relative">
				<div onClick={() => setIsOpen(!isOpen)} className={`w-full p-2 bg-gray-50 border rounded-lg flex flex-wrap gap-2 items-center cursor-text ${error ? "border-red-500" : "border-gray-300"}`}>
					{value.map(val => (
						<span key={val} className="bg-[#EBEAF2] text-[#312E81] text-xs font-semibold px-2 py-1 rounded-full flex items-center">
							{options.find(opt => opt.value === val)?.label}
							<button
								type="button"
								onClick={e => {
									e.stopPropagation();
									handleRemove(val);
								}}
								className="ml-2"
							>
								<XIcon className="w-3 h-3" />
							</button>
						</span>
					))}
					<span className="text-gray-500">{value.length === 0 ? "Select sectors..." : ""}</span>
				</div>
				<AnimatePresence>
					{isOpen && (
						<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
							<div className="p-2">
								<input type="text" placeholder="Search sectors..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4340a0]" />
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
export default CustomMultiSelect;
