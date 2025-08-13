export const stakeholderData = [
    { title: 'Companies', count: 59, imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop', description: "All startups, Companies, Organizations will be here" },
    { title: 'Investors', count: 926, imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop', description: "All VCs, Angel Investors will be here" },
    { title: 'Individuals', count: 311, imageUrl: 'https://images.unsplash.com/photo-150767979987-c73779587ccf?q=80&w=2070&auto=format&fit=crop', description: "Individual stakeholders and contacts" },
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
  
  export const chatListData = [
      { id: 1, name: 'Oliver Bearman Angel', lastMessage: 'hey', time: '10:42', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', unread: 0 },
      { id: 2, name: 'Christian Horner', lastMessage: 'hello', time: '10:30', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', unread: 0 },
      { id: 3, name: 'Test inv 2', lastMessage: 'yo yo yo', time: '10:25', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', unread: 2 },
      { id: 4, name: 'New emp', lastMessage: 'heyyyyyyyyyyyyyyyyyyyy', time: 'Mon', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', unread: 0 },
      { id: 5, name: 'Antennae Ventures Pvt Ltd', lastMessage: 'tooooooooooooooooooo', time: 'Mon', avatar: 'https://placehold.co/40x40/E2E8F0/4A5568?text=AV', unread: 0 },
      { id: 6, name: 'Tania Acharekar', lastMessage: 'See you then!', time: 'Sun', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', unread: 0 },
      { id: 7, name: 'Ashish Jain', lastMessage: 'Thanks!', time: 'Sun', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', unread: 1 },
  ];
  
  export const messageData = {
      3: [
          { id: 1, sender: 'Test inv 2', text: 'howdy', time: '10:04', me: false },
          { id: 2, sender: 'Me', text: 'yo yo yo', time: '10:25', me: true },
      ],
  };
  
  // New Employee Data
  export const employeeData = [
      { id: 1, name: 'Abrar Ahmed', email: 'abrar54@gmail.com', role: 'Advisor / Mentor', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
      { id: 2, name: 'Ashish Jain', email: 'ashish@antennae.in', role: 'Investor Relations', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
      { id: 3, name: 'Christian Martin', email: 'chris@gmail.com', role: 'Financial Analyst', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
      { id: 4, name: 'Kairav Panchal', email: 'kairav@antennae.in', role: 'Associate', avatar: 'https://randomuser.me/api/portraits/men/14.jpg' },
      { id: 5, name: 'Krishnakumar Devnally', email: 'krishnakumar@antennae.in', role: 'Co-Founder', avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
  ];
  