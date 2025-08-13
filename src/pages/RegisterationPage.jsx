import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, writeBatch, collection } from "firebase/firestore";
// import { auth, db } from "../firebase/config"; // Make sure you have this file
import { useNavigate } from "react-router-dom";
import { countries_data } from "../data/countries"; // Import country data
import { sectors_data } from "../data/sectors"; // Import sector data
import CustomSelect from "../components/CustomSelect"; // Import new component
import CustomMultiSelect from "../components/CustomMultiSelect"; // Import new component
import PortfoliomateLogo from "../assets/PortfoliomateLogo.svg"; // Import the logo

// --- SVG Icons ---
const BuildingIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
		<path d="M9 22v-4h6v4"></path>
		<path d="M8 6h.01"></path>
		<path d="M16 6h.01"></path>
		<path d="M12 6h.01"></path>
		<path d="M12 10h.01"></path>
		<path d="M12 14h.01"></path>
		<path d="M16 10h.01"></path>
		<path d="M8 10h.01"></path>
		<path d="M16 14h.01"></path>
		<path d="M8 14h.01"></path>
	</svg>
);
const BriefcaseIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
		<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
	</svg>
);
const RocketIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05A7.38 7.38 0 0 0 8 15.5c.79-3.47 4.2-7.5 7.5-10.5a2.5 2.5 0 0 1 3.5 3.5c-3 3.26-7 6.7-10.5 7.5-1.25.33-2.69-.09-3.05.05z"></path>
	</svg>
);
const LandmarkIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="3" y1="22" x2="21" y2="22"></line>
		<line x1="6" y1="18" x2="6" y2="11"></line>
		<line x1="10" y1="18" x2="10" y2="11"></line>
		<line x1="14" y1="18" x2="14" y2="11"></line>
		<line x1="18" y1="18" x2="18" y2="11"></line>
		<polygon points="12 2 20 7 4 7"></polygon>
	</svg>
);
const UniversityIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="12" cy="10" r="3"></circle>
		<path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path>
	</svg>
);
const UsersIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
		<circle cx="9" cy="7" r="4"></circle>
		<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
		<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
	</svg>
);
const MicIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
		<path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
		<line x1="12" y1="19" x2="12" y2="23"></line>
	</svg>
);
const LoaderIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="12" y1="2" x2="12" y2="6"></line>
		<line x1="12" y1="18" x2="12" y2="22"></line>
		<line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
		<line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
		<line x1="2" y1="12" x2="6" y2="12"></line>
		<line x1="18" y1="12" x2="22" y2="12"></line>
		<line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
		<line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
	</svg>
);
const PlusCircleIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="12" cy="12" r="10"></circle>
		<line x1="12" y1="8" x2="12" y2="16"></line>
		<line x1="8" y1="12" x2="16" y2="12"></line>
	</svg>
);
const TrashIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<polyline points="3 6 5 6 21 6"></polyline>
		<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
	</svg>
);
const InfoIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="12" cy="12" r="10"></circle>
		<line x1="12" y1="16" x2="12" y2="12"></line>
		<line x1="12" y1="8" x2="12.01" y2="8"></line>
	</svg>
);

const stakeholderTypes = [
	{ value: "startup", label: "Startup / Company", icon: RocketIcon },
	{ value: "investor", label: "Investor / VC / Fund", icon: BriefcaseIcon },
	{ value: "gcc", label: "GCC", icon: BuildingIcon },
	{ value: "policy_maker", label: "Policy Maker", icon: LandmarkIcon },
	{ value: "academia", label: "Academia / Researcher", icon: UniversityIcon },
	{ value: "enthusiast", label: "Enthusiast / Participant", icon: UsersIcon },
	{ value: "expert", label: "Industry Expert", icon: MicIcon },
];

const pageVariants = {
	initial: { opacity: 0, x: "-50vw" },
	in: { opacity: 1, x: 0 },
	out: { opacity: 0, x: "50vw" },
};

const pageTransition = {
	type: "tween",
	ease: "anticipate",
	duration: 0.7,
};

const RegisterPage = () => {
	const [step, setStep] = useState(1);
	const [selectedType, setSelectedType] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [firebaseError, setFirebaseError] = useState("");
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			members: [{ fullName: "", email: "", password: "", designation: "" }],
			sectors: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "members",
	});

	const handleTypeSelect = type => {
		setSelectedType(type);
		setStep(2);
	};

	const onSubmit = async data => {
		setIsLoading(true);
		setFirebaseError("");
		try {
			const batch = writeBatch(db);
			const companyId = doc(collection(db, "companies")).id;

			const companyProfileRef = doc(db, "companies", companyId);
			const companyData = {
				companyName: data.companyName,
				country: data.country,
				sectors: data.sectors,
				businessDescription: data.businessDescription,
				seekingFunding: data.seekingFunding,
				previousFunding: data.previousFunding || null,
				valuation: data.valuation || null,
				createdAt: new Date(),
				memberUids: [],
			};

			const memberCreationPromises = data.members.map(async member => {
				const userCredential = await createUserWithEmailAndPassword(auth, member.email, member.password);
				const user = userCredential.user;

				const userProfileRef = doc(db, "profiles", user.uid);
				const userProfileData = {
					ownerUid: user.uid,
					email: member.email,
					fullName: member.fullName,
					designation: member.designation,
					companyId: companyId,
					companyName: data.companyName,
					stakeholderType: selectedType.value,
					createdAt: new Date(),
				};
				batch.set(userProfileRef, userProfileData);

				const userRef = doc(db, "users", user.uid);
				const userData = {
					uid: user.uid,
					email: member.email,
					displayName: member.fullName,
					stakeholderType: selectedType.value,
					profileId: user.uid,
					companyId: companyId,
					createdAt: new Date(),
				};
				batch.set(userRef, userData);

				return user.uid;
			});

			const memberUids = await Promise.all(memberCreationPromises);
			companyData.memberUids = memberUids;
			batch.set(companyProfileRef, companyData);

			await batch.commit();
			navigate("/");
		} catch (error) {
			setFirebaseError(error.message.replace("Firebase: ", ""));
		} finally {
			setIsLoading(false);
		}
	};

	const FormInput = ({ id, label, type = "text", validation, isMember = false, index }) => {
		const fieldName = isMember ? `members.${index}.${id}` : id;
		return (
			<div className="relative mb-4">
				<label htmlFor={fieldName} className="block text-sm font-medium text-gray-600 mb-1">
					{label}
				</label>
				<input id={fieldName} type={type} {...register(fieldName, validation)} className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#4340a0] focus:border-[#4340a0] transition duration-200 ${errors[id] ? "border-red-500" : "border-gray-300"}`} />
				{errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
			</div>
		);
	};

	const FormTextarea = ({ id, label, validation }) => (
		<div className="relative mb-4">
			<label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
				{label}
			</label>
			<textarea id={id} {...register(id, validation)} className="w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#4340a0] focus:border-[#4340a0] transition duration-200 h-24 resize-none" />
			{errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
		</div>
	);

	const FormRadio = ({ id, label, options, validation }) => (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
			<div className="flex gap-4">
				{options.map(option => (
					<div key={option.value} className="flex items-center">
						<input id={`${id}-${option.value}`} type="radio" value={option.value} {...register(id, validation)} className="h-4 w-4 text-[#312E81] focus:ring-[#4340a0] border-gray-300" />
						<label htmlFor={`${id}-${option.value}`} className="ml-2 block text-sm text-gray-900">
							{option.label}
						</label>
					</div>
				))}
			</div>
		</div>
	);

	const renderStartupForm = () => (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			<div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded-r-lg" role="alert">
				<div className="flex">
					<div className="py-1">
						<InfoIcon className="w-6 h-6 text-blue-500 mr-4" />
					</div>
					<div>
						<p className="font-bold">Complete Your Profile for Maximum Visibility!</p>
						<p className="text-sm">A detailed profile helps investors find you and makes your startup stand out. Some fields can be edited later from your dashboard.</p>
					</div>
				</div>
			</div>

			{/* Company Details Section */}
			<div>
				<h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Company Details</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
					<FormInput id="companyName" label="Company / Startup Name" validation={{ required: "Company name is required" }} />
					<div>
						<label htmlFor="logo" className="block text-sm font-medium text-gray-600 mb-1">
							Company Logo
						</label>
						<input type="file" id="logo" {...register("logo")} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#EBEAF2] file:text-[#312E81] hover:file:bg-[#dcd9f7]" />
					</div>
					<Controller name="country" control={control} rules={{ required: "Country is required" }} render={({ field }) => <CustomSelect id="country" label="Country of Registration" options={countries_data.map(c => ({ label: c.name, value: c.name }))} value={field.value} onChange={field.onChange} error={errors.country} />} />
					<Controller name="sectors" control={control} rules={{ required: "At least one sector is required" }} render={({ field }) => <CustomMultiSelect id="sectors" label="Sectors" options={sectors_data.map(s => ({ label: s.IndustryName, value: s.IndustryName }))} value={field.value} onChange={field.onChange} error={errors.sectors} />} />
				</div>
				<FormTextarea id="businessDescription" label="Business Description" validation={{ required: "Description is required", maxLength: { value: 500, message: "Maximum 500 characters" } }} />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
					<FormRadio
						id="seekingFunding"
						label="Are you seeking funding?"
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						validation={{ required: "This field is required" }}
					/>
					<FormInput id="previousFunding" label="Previous Funding (e.g., $500K)" />
					<FormInput id="valuation" label="Current Valuation (Optional)" />
				</div>
			</div>

			{/* Attending Members Section */}
			<div>
				<h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Attending Members</h3>
				{fields.map((field, index) => (
					<div key={field.id} className="p-4 border rounded-lg mb-4 relative bg-gray-50">
						{fields.length > 1 && (
							<button type="button" onClick={() => remove(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
								<TrashIcon className="w-4 h-4" />
							</button>
						)}
						<p className="font-medium text-gray-600 mb-2">Member {index + 1}</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
							<FormInput id="fullName" label="Full Name" validation={{ required: "Full name is required" }} isMember index={index} />
							<FormInput id="designation" label="Designation" validation={{ required: "Designation is required" }} isMember index={index} />
							<FormInput id="email" label="Email Address" type="email" validation={{ required: "Email is required" }} isMember index={index} />
							<FormInput id="password" label="Password" type="password" validation={{ required: "Password is required", minLength: { value: 8, message: "Min 8 characters" } }} isMember index={index} />
						</div>
					</div>
				))}
				<button type="button" onClick={() => append({ fullName: "", email: "", password: "", designation: "" })} className="flex items-center text-sm font-medium text-[#312E81] hover:text-[#282569]">
					<PlusCircleIcon className="w-5 h-5 mr-2" />
					Add Another Member
				</button>
			</div>

			{firebaseError && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{firebaseError}</p>}

			<button type="submit" disabled={isLoading} className="w-full bg-[#312E81] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-[#282569] transition duration-300 flex items-center justify-center disabled:bg-opacity-50">
				{isLoading ? <LoaderIcon className="animate-spin" /> : "Complete Registration"}
			</button>
		</form>
	);

	const renderGenericForm = () => (
		<form onSubmit={handleSubmit(onSubmit)}>
			{firebaseError && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{firebaseError}</p>}
			<FormInput id="fullName" label="Full Name" validation={{ required: "Full name is required" }} />
			<FormInput id="email" label="Email Address" type="email" validation={{ required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } }} />
			<FormInput id="password" label="Password" type="password" validation={{ required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } }} />

			{["investor", "gcc"].includes(selectedType.value) && (
				<>
					<FormInput id="companyName" label="Company / Fund Name" validation={{ required: "This field is required" }} />
					<FormInput id="designation" label="Your Designation" validation={{ required: "This field is required" }} />
				</>
			)}

			<button type="submit" disabled={isLoading} className="w-full bg-[#312E81] text-white py-3 mt-2 rounded-lg font-semibold hover:bg-[#282569] transition duration-300 flex items-center justify-center disabled:bg-opacity-50">
				{isLoading ? <LoaderIcon className="animate-spin" /> : "Complete Registration"}
			</button>
		</form>
	);

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
			<div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-[#312E81]">Join the Event</h1>
					<p className="text-gray-500 mt-2">Let's get you set up. It only takes a minute.</p>

					<div className="mt-8 text-center">
						<a href="https://portfoliomate.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-gray-500 hover:text-[#312E81] transition-colors">
							Powered by
							<img src={PortfoliomateLogo} alt="Portfoliomate Logo" className="h-6 mx-2" /> Portfoliomate
						</a>
					</div>
				</div>

				<motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl overflow-hidden">
					<AnimatePresence mode="wait">
						{step === 1 && (
							<motion.div key="step1" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="max-w-lg mx-auto">
								<h2 className="text-xl font-semibold text-center mb-6 text-gray-800">First, tell us who you are.</h2>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
									{stakeholderTypes.map(type => (
										<motion.button key={type.value} onClick={() => handleTypeSelect(type)} className="text-center p-4 border border-gray-200 rounded-lg hover:bg-[#EBEAF2] hover:border-[#312E81] hover:shadow-lg transition-all duration-300 group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
											<type.icon className="w-8 h-8 mx-auto text-gray-500 group-hover:text-[#312E81] transition-colors" />
											<p className="text-sm font-medium mt-2 text-gray-700 group-hover:text-[#312E81] transition-colors">{type.label}</p>
										</motion.button>
									))}
								</div>
							</motion.div>
						)}

						{step === 2 && selectedType && (
							<motion.div key="step2" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}>
								<button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-[#312E81] mb-4">
									&larr; Back to selection
								</button>
								<h2 className="text-xl font-semibold text-center mb-1 text-gray-800">Great! Now for the details.</h2>
								<p className="text-center text-sm text-gray-500 mb-6">
									Registering as a <span className="font-bold text-[#312E81]">{selectedType.label}</span>
								</p>

								{selectedType.value === "startup" ? renderStartupForm() : renderGenericForm()}
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</div>
	);
};

export default RegisterPage;
