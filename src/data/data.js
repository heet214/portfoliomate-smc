export const stakeholderData = [
    { title: 'Companies', count: 59, imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop', description: "All startups, Companies, Organizations will be here" },
    { title: 'Investors', count: 926, imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop', description: "All VCs, Angel Investors will be here" },
    { title: 'Individuals', count: 311, imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop', description: "Individual stakeholders and contacts" },
    { title: 'Universities', count: 18, imageUrl: 'https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=2070&auto=format&fit=crop', description: "Educational and research institutions" },
    { title: 'Operators', count: 115, imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', description: "Operators and service providers" },
  ];
  
  const generateCompanyData = (count) => {
      const data = [];
      const sectors = ['Food & Beverage', 'Food Delivery', 'Angel Investment', 'Android', 'Ad Exchange', '3D Technology', 'Sector Agnostic', 'AgTech', 'Property Development', 'Aerospace'];
      const locations = ['India', 'Cambodia', 'Vatican City', 'Åland Islands', 'Andorra', 'USA', 'Germany', 'Singapore'];
      const statuses = [{text: 'Profile Completed', bg: 'bg-green-100', text_color: 'text-green-700'}, {text: 'Profile Created', bg: 'bg-yellow-100', text_color: 'text-yellow-700'}];
      const names = ['Uber Eats', 'Baseline Test', 'Heet Test', 'abc', 'Mangopoint', 'ParkoBot', 'Tomo Corp', 'Florintree Advisors', 'Innovate Inc.', 'Future Systems'];
  
      for (let i = 1; i <= count; i++) {
          const name = names[i % names.length];
          data.push({
              id: i,
              logo: `https://raw.githubusercontent.com/user-attachments/assets/c3976c59-3965-4654-814a-e782a20235a9/PortfoliomateLogosidebar.svg`,
              name: `${name}`,
              createdOn: new Date(2025, 7, 12 - (i % 30)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
              sector: sectors.slice(i % 5, (i % 5) + (i % 2 + 1)),
              location: locations[i % locations.length],
              status: statuses[i % statuses.length],
          });
      }
      return data;
  };
  
  export const companyListData = generateCompanyData(59);
  
  // New data for a single profile
  export const profileData = {
      id: 7,
      name: 'Tomo Corp',
      logo: 'https://raw.githubusercontent.com/user-attachments/assets/c3976c59-3965-4654-814a-e782a20235a9/PortfoliomateLogosidebar.svg',
      banner: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=2155&auto=format&fit=crop',
      type: 'Startup',
      status: 'Profile Completed',
      about: 'No description provided',
      registeredName: 'Tomo Corporation Pvt. Ltd.',
      brandName: 'Tomo Corp',
      cin: null,
      address: null,
      pincode: null,
      incorporatedAt: 'India',
      website: 'tomocorp.com',
      sectors: ['Sector Agnostic', '3D Technology'],
      socialMedia: null,
  };
  
  export const documentData = [
      { id: 1, name: 'Tomo Corp Presentation.pdf', date: '04 Aug 2025, 12:48 PM', isPrivate: true, category: 'Company Documents' },
      { id: 2, name: 'Tomo Corp Future Vision.pdf', date: '04 Aug 2025, 12:48 PM', isPrivate: false, category: 'Company Documents' },
      { id: 3, name: 'Tomo Corp Annual Report 2025.pdf', date: '04 Aug 2025, 12:48 PM', isPrivate: false, category: 'Company Documents' },
      { id: 4, name: 'Marketing Strategy.pdf', date: '04 Aug 2025, 12:48 PM', isPrivate: true, category: 'Company Documents' },
      { id: 5, name: 'Innovative Solutions.pdf', date: '04 Aug 2025, 12:48 PM', isPrivate: false, category: 'Company Documents' },
      { id: 6, name: 'Financial Summary.pdf', date: '04 Aug 2025, 12:48 PM', isPrivate: true, category: 'Company Documents' },
      { id: 7, name: 'Tomo Corp Client Testimonials.pdf', date: '04 Aug 2025, 12:48 PM', isPrivate: false, category: 'Company Documents' },
      { id: 8, name: 'Product Launch Plan.pdf', date: '04 Aug 2025, 12:48 PM', isPrivate: false, category: 'Company Documents' },
      { id: 9, name: 'Mandate Agreement.pdf', date: '01 Aug 2025, 10:00 AM', isPrivate: true, category: 'Mandates' },
      { id: 10, name: 'NDA.pdf', date: '02 Aug 2025, 11:30 AM', isPrivate: true, category: 'Mandates' },
      { id: 11, name: 'Process Outline.pdf', date: '03 Aug 2025, 09:00 AM', isPrivate: false, category: 'Engagement Process' },
      { id: 12, name: 'Timeline.pdf', date: '03 Aug 2025, 09:15 AM', isPrivate: false, category: 'Engagement Process' },
  ];
  