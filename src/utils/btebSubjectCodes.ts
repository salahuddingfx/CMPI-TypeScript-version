/**
 * BTEB Diploma-in-Engineering Subject Code Dictionary
 * Source: Official BTEB Probidhan-2022 & Probidhan-2016 curriculum
 * Department codes: Civil=64, CST=65/85, Electrical=67, Electronics=68, Telecom=70/71
 *
 * Code pattern (2022 regulation): 2[dept][seq]  e.g. 264xx = Civil-2022
 * Code pattern (2016 regulation): 6[dept][seq]  e.g. 664xx = Civil-2016
 * General/Science subjects: 25xxx (2022) / 65xxx (2016)
 */

export interface BtebSubjectInfo {
  name: string;
  dept: string;
}

export const BTEB_SUBJECTS: Record<string, BtebSubjectInfo> = {

  // ═══════════════════════════════════════════════════════════════════════════
  // SHARED / CROSS-DEPARTMENT SUBJECTS — used by multiple departments
  // These should NOT be used for department detection
  // ═══════════════════════════════════════════════════════════════════════════

  // 2022 Regulation — Shared
  "26711": { name: "Basic Electricity", dept: "Shared" },
  "26811": { name: "Basic Electronics", dept: "Shared" },
  "27011": { name: "Workshop Technology", dept: "Shared" },
  "27012": { name: "Basic Workshop Practice", dept: "Shared" },
  "27041": { name: "Engineering Mechanics", dept: "Shared" },
  "27051": { name: "Fluid Mechanics", dept: "Shared" },
  "27061": { name: "Strength of Materials", dept: "Shared" },
  "26721": { name: "Electrical Circuits-I", dept: "Shared" },
  "26833": { name: "Industrial Electronics", dept: "Shared" },
  "26842": { name: "Communication Engineering", dept: "Shared" },
  "26845": { name: "Digital Electronics", dept: "Shared" },
  "26853": { name: "Microprocessor & Microcontroller", dept: "Shared" },

  // 2016 Regulation — Shared
  "67011": { name: "Workshop Technology", dept: "Shared" },
  "67012": { name: "Basic Workshop Practice", dept: "Shared" },
  "67041": { name: "Engineering Mechanics", dept: "Shared" },
  "67051": { name: "Fluid Mechanics", dept: "Shared" },
  "67061": { name: "Strength of Materials", dept: "Shared" },
  "66721": { name: "Electrical Circuits-I", dept: "Shared" },
  "66845": { name: "Digital Electronics", dept: "Shared" },

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERAL / SCIENCE SUBJECTS — shared by all departments
  // ═══════════════════════════════════════════════════════════════════════════

  // 2022 Regulation — General
  "21011": { name: "Engineering Drawing", dept: "General" },
  "25711": { name: "Bangla-I", dept: "General" },
  "25712": { name: "English-I", dept: "General" },
  "25721": { name: "Bangla-II", dept: "General" },
  "25722": { name: "English-II", dept: "General" },
  "25811": { name: "Social Science", dept: "General" },
  "25812": { name: "Physical Education & Life Skills Development", dept: "General" },
  "25831": { name: "Business Communication", dept: "General" },
  "25841": { name: "Accounting", dept: "General" },
  "25851": { name: "Principles of Marketing", dept: "General" },
  "25852": { name: "Industrial Management", dept: "General" },
  "25853": { name: "Innovation & Entrepreneurship", dept: "General" },
  "25911": { name: "Mathematics-I", dept: "General" },
  "25912": { name: "Physics-I", dept: "General" },
  "25913": { name: "Chemistry", dept: "General" },
  "25921": { name: "Mathematics-II", dept: "General" },
  "25922": { name: "Physics-II", dept: "General" },
  "25931": { name: "Mathematics-III", dept: "General" },
  "29041": { name: "Environmental Studies", dept: "General" },

  // 2016 Regulation — General
  "61011": { name: "Engineering Drawing", dept: "General" },
  "65711": { name: "Bangla", dept: "General" },
  "65712": { name: "English", dept: "General" },
  "65722": { name: "Communicative English", dept: "General" },
  "65811": { name: "Social Science", dept: "General" },
  "65812": { name: "Physical Education & Life Skill Development", dept: "General" },
  "65841": { name: "Business Organization & Communication", dept: "General" },
  "65851": { name: "Accounting Theory & Practice", dept: "General" },
  "65852": { name: "Industrial Management", dept: "General" },
  "65853": { name: "Innovation & Entrepreneurship", dept: "General" },
  "65911": { name: "Mathematics-1", dept: "General" },
  "65912": { name: "Physics-1", dept: "General" },
  "65913": { name: "Chemistry", dept: "General" },
  "65921": { name: "Mathematics-2", dept: "General" },
  "65922": { name: "Physics-2", dept: "General" },
  "65931": { name: "Mathematics-3", dept: "General" },
  "69054": { name: "Environmental Studies", dept: "General" },

  // ═══════════════════════════════════════════════════════════════════════════
  // CIVIL TECHNOLOGY (Department Code 64)
  // ═══════════════════════════════════════════════════════════════════════════

  // 2022 Regulation — Civil Technology (264xx)
  "26411": { name: "Civil Engineering Materials", dept: "Civil Technology" },
  "26421": { name: "Civil Engineering Drawing", dept: "Civil Technology" },
  "26431": { name: "Structural Mechanics", dept: "Civil Technology" },
  "26432": { name: "Surveying-I", dept: "Civil Technology" },
  "26433": { name: "Construction Process-I", dept: "Civil Technology" },
  "26441": { name: "Construction Process-II", dept: "Civil Technology" },
  "26442": { name: "Estimating & Costing-I", dept: "Civil Technology" },
  "26443": { name: "Civil CAD-I", dept: "Civil Technology" },
  "26444": { name: "Surveying-II", dept: "Civil Technology" },
  "26445": { name: "Geotechnical Engineering", dept: "Civil Technology" },
  "26446": { name: "Hydrology", dept: "Civil Technology" },
  "26451": { name: "Foundation Engineering", dept: "Civil Technology" },
  "26452": { name: "Civil CAD-II", dept: "Civil Technology" },
  "26453": { name: "Surveying-III", dept: "Civil Technology" },
  "26454": { name: "Theory of Structure", dept: "Civil Technology" },
  "26455": { name: "Water Supply Engineering", dept: "Civil Technology" },
  "26456": { name: "Hydraulics", dept: "Civil Technology" },
  "26461": { name: "Water Resources Engineering", dept: "Civil Technology" },
  "26462": { name: "Advance Surveying", dept: "Civil Technology" },
  "26463": { name: "Transportation Engineering-I", dept: "Civil Technology" },
  "26464": { name: "Design of Structure-I", dept: "Civil Technology" },
  "26471": { name: "Civil Engineering Project", dept: "Civil Technology" },
  "26472": { name: "Sanitary Engineering", dept: "Civil Technology" },
  "26473": { name: "Transportation Engineering-II", dept: "Civil Technology" },
  "26474": { name: "Design of Structure-II", dept: "Civil Technology" },
  "26481": { name: "Industrial Attachment & Project Presentation", dept: "Civil Technology" },
  "26521": { name: "Wood Workshop Practice", dept: "Civil Technology" },
  "28863": { name: "Steel Structures", dept: "Civil Technology" },

  // 2016 Regulation — Civil Technology (664xx)
  "66421": { name: "Civil Engineering Materials", dept: "Civil Technology" },
  "66431": { name: "Civil Engineering Drawing-1", dept: "Civil Technology" },
  "66432": { name: "Surveying-1", dept: "Civil Technology" },
  "66433": { name: "Construction Process-1", dept: "Civil Technology" },
  "66434": { name: "Civil Workshop Practice", dept: "Civil Technology" },
  "66441": { name: "Structural Mechanics", dept: "Civil Technology" },
  "66442": { name: "Estimating & Costing-1", dept: "Civil Technology" },
  "66443": { name: "Civil Engineering Drawing-2 (CAD)", dept: "Civil Technology" },
  "66444": { name: "Surveying-2", dept: "Civil Technology" },
  "66445": { name: "Geotechnical Engineering", dept: "Civil Technology" },
  "66451": { name: "Construction Process-II", dept: "Civil Technology" },
  "66452": { name: "Surveying-III", dept: "Civil Technology" },
  "66453": { name: "Water Supply Engineering", dept: "Civil Technology" },
  "66454": { name: "Theory of Structure", dept: "Civil Technology" },
  "66455": { name: "Estimating & Costing-II", dept: "Civil Technology" },
  "66456": { name: "Hydraulics", dept: "Civil Technology" },
  "66461": { name: "Advance Surveying", dept: "Civil Technology" },
  "66462": { name: "Transportation Engineering-1", dept: "Civil Technology" },
  "66463": { name: "Design of Structure-1", dept: "Civil Technology" },
  "66464": { name: "Civil Engineering Drawing-3 (CAD)", dept: "Civil Technology" },
  "66465": { name: "Foundation Engineering", dept: "Civil Technology" },
  "66466": { name: "Civil Engineering Software", dept: "Civil Technology" },
  "66471": { name: "Civil Engineering Project", dept: "Civil Technology" },
  "66472": { name: "Sanitary Engineering", dept: "Civil Technology" },
  "66473": { name: "Transportation Engineering-2", dept: "Civil Technology" },
  "66474": { name: "Design of Structure-2", dept: "Civil Technology" },
  "66475": { name: "Water Resources Engineering", dept: "Civil Technology" },
  "66481": { name: "Industrial Training", dept: "Civil Technology" },
  "68873": { name: "Construction Management & Documentation", dept: "Civil Technology" },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPUTER SCIENCE & TECHNOLOGY (Department Code 65 → tech code 85 in 2022)
  // ═══════════════════════════════════════════════════════════════════════════

  // 2022 Regulation — CST (285xx)
  "28511": { name: "Computer Office Application", dept: "Computer Science & Technology" },
  "28521": { name: "Python Programming", dept: "Computer Science & Technology" },
  "28522": { name: "Computer Graphics Design-I", dept: "Computer Science & Technology" },
  "28531": { name: "Application Development Using Python", dept: "Computer Science & Technology" },
  "28532": { name: "Computer Graphics Design-II", dept: "Computer Science & Technology" },
  "28541": { name: "Java Programming", dept: "Computer Science & Technology" },
  "28542": { name: "Data Structure & Algorithm", dept: "Computer Science & Technology" },
  "28543": { name: "Computer Peripherals & Interfacing", dept: "Computer Science & Technology" },
  "28544": { name: "Web Design & Development-I", dept: "Computer Science & Technology" },
  "28551": { name: "Application Development Using Java", dept: "Computer Science & Technology" },
  "28552": { name: "Web Design & Development-II", dept: "Computer Science & Technology" },
  "28553": { name: "Computer Architecture & Microprocessor", dept: "Computer Science & Technology" },
  "28554": { name: "Data Communication", dept: "Computer Science & Technology" },
  "28555": { name: "Operating System", dept: "Computer Science & Technology" },
  "28556": { name: "Project Work-I", dept: "Computer Science & Technology" },
  "28561": { name: "Database Management System", dept: "Computer Science & Technology" },
  "28562": { name: "Computer Networking", dept: "Computer Science & Technology" },
  "28563": { name: "Sensor & IoT System", dept: "Computer Science & Technology" },
  "28564": { name: "Microcontroller Based System Design & Development", dept: "Computer Science & Technology" },
  "28565": { name: "Surveillance Security System", dept: "Computer Science & Technology" },
  "28566": { name: "Web Development Project", dept: "Computer Science & Technology" },
  "28581": { name: "Industrial Attachment", dept: "Computer Science & Technology" },

  // 2016 Regulation — Computer Technology (666xx)
  "66611": { name: "Computer Application", dept: "Computer Science & Technology" },
  "66612": { name: "Computer Workshop Practice", dept: "Computer Science & Technology" },
  "66621": { name: "Database Application", dept: "Computer Science & Technology" },
  "66622": { name: "IT Support System-I", dept: "Computer Science & Technology" },
  "66623": { name: "Graphic Design-I", dept: "Computer Science & Technology" },
  "66631": { name: "Programming Essentials", dept: "Computer Science & Technology" },
  "66632": { name: "Web Design", dept: "Computer Science & Technology" },
  "66633": { name: "Graphics Design-II", dept: "Computer Science & Technology" },
  "66634": { name: "IT Support-II", dept: "Computer Science & Technology" },
  "66641": { name: "Object Oriented Programming", dept: "Computer Science & Technology" },
  "66642": { name: "Data Structure & Algorithm", dept: "Computer Science & Technology" },
  "66643": { name: "Web Development", dept: "Computer Science & Technology" },
  "66644": { name: "Data Communication System", dept: "Computer Science & Technology" },
  "66645": { name: "Computer Peripherals", dept: "Computer Science & Technology" },
  "66651": { name: "Programming in Java", dept: "Computer Science & Technology" },
  "66652": { name: "Surveillance Security System", dept: "Computer Science & Technology" },
  "66653": { name: "Sequential Logic Systems", dept: "Computer Science & Technology" },
  "66654": { name: "Web Development Project", dept: "Computer Science & Technology" },
  "66655": { name: "PCB Design & Circuit Making", dept: "Computer Science & Technology" },
  "68546": { name: "Operating System Application", dept: "Computer Science & Technology" },
  "66661": { name: "Principles of Software Engineering", dept: "Computer Science & Technology" },
  "66662": { name: "Microprocessor & Interfacing", dept: "Computer Science & Technology" },
  "66663": { name: "Microcontroller Application", dept: "Computer Science & Technology" },
  "66664": { name: "Database Management System", dept: "Computer Science & Technology" },
  "66665": { name: "Network & Data Center Operation", dept: "Computer Science & Technology" },
  "66666": { name: "PLC Automation System", dept: "Computer Science & Technology" },
  "66667": { name: "Web Mastering", dept: "Computer Science & Technology" },
  "66668": { name: "Multimedia & Animation", dept: "Computer Science & Technology" },
  "66671": { name: "System Analysis and Design", dept: "Computer Science & Technology" },
  "66672": { name: "Network Administration & Services", dept: "Computer Science & Technology" },
  "66673": { name: "Apps Development Project", dept: "Computer Science & Technology" },
  "66674": { name: "E-Commerce & CMS", dept: "Computer Science & Technology" },
  "66675": { name: "Cyber Security & Ethics", dept: "Computer Science & Technology" },
  "66677": { name: "ICT Project", dept: "Computer Science & Technology" },
  "66681": { name: "Industrial Training", dept: "Computer Science & Technology" },

  // ═══════════════════════════════════════════════════════════════════════════
  // ELECTRICAL TECHNOLOGY (Department Code 67)
  // ═══════════════════════════════════════════════════════════════════════════

  // 2022 Regulation — Electrical Technology (267xx / 268xx)
  "26711": { name: "Basic Electricity", dept: "Electrical Technology" },
  "26712": { name: "Electrical Engineering Materials", dept: "Electrical Technology" },
  "26721": { name: "Electrical Circuits-I", dept: "Electrical Technology" },
  "26722": { name: "Electrical Engineering Drawing", dept: "Electrical Technology" },
  "26731": { name: "Electrical Circuits-II", dept: "Electrical Technology" },
  "26732": { name: "Electrical Appliances", dept: "Electrical Technology" },
  "26741": { name: "Electrical Installation, Planning & Estimating", dept: "Electrical Technology" },
  "26742": { name: "DC Machine", dept: "Electrical Technology" },
  "26743": { name: "Electrical Engineering Project-I", dept: "Electrical Technology" },
  "26751": { name: "Generation of Electrical Power", dept: "Electrical Technology" },
  "26752": { name: "Electrical & Electronic Measurements-I", dept: "Electrical Technology" },
  "26753": { name: "Testing & Maintenance of Electrical Equipments", dept: "Electrical Technology" },
  "26754": { name: "Electrical Engineering Project-II", dept: "Electrical Technology" },
  "26761": { name: "AC Machine-I", dept: "Electrical Technology" },
  "26763": { name: "Electrical & Electronic Measurements-II", dept: "Electrical Technology" },
  "26811": { name: "Basic Electronics", dept: "Electrical Technology" },
  "26833": { name: "Industrial Electronics", dept: "Electrical Technology" },
  "26842": { name: "Communication Engineering", dept: "Electrical Technology" },
  "26845": { name: "Digital Electronics", dept: "Electrical Technology" },
  "26853": { name: "Microprocessor & Microcontroller", dept: "Electrical Technology" },
  "26667": { name: "Programming in C", dept: "Electrical Technology" },

  // 2016 Regulation — Electrical Technology (667xx)
  "66711": { name: "Basic Electricity", dept: "Electrical Technology" },
  "66712": { name: "Electrical Engineering Fundamentals", dept: "Electrical Technology" },
  "66713": { name: "Electrical Engineering Materials", dept: "Electrical Technology" },
  "66721": { name: "Electrical Circuits-1", dept: "Electrical Technology" },
  "66722": { name: "Electrical Appliances", dept: "Electrical Technology" },
  "66731": { name: "Electrical Circuits-2", dept: "Electrical Technology" },
  "66732": { name: "Advance Electricity", dept: "Electrical Technology" },
  "66733": { name: "Electrical Engineering Drawing", dept: "Electrical Technology" },
  "66741": { name: "Electrical Installation Planning & Estimating", dept: "Electrical Technology" },
  "66742": { name: "DC Machines", dept: "Electrical Technology" },
  "66751": { name: "Electrical & Electronic Measurement-1", dept: "Electrical Technology" },
  "66752": { name: "Generation of Electrical Power", dept: "Electrical Technology" },
  "66753": { name: "Renewable Energy", dept: "Electrical Technology" },
  "66761": { name: "Alternating Current Machines-1", dept: "Electrical Technology" },
  "66762": { name: "Electrical & Electronic Measurement-2", dept: "Electrical Technology" },
  "66763": { name: "Transmission & Distribution of Electrical Power-1", dept: "Electrical Technology" },
  "66771": { name: "Alternating Current Machines-2", dept: "Electrical Technology" },
  "66772": { name: "Electrical Engineering Project", dept: "Electrical Technology" },
  "66773": { name: "Switch Gear & Protection", dept: "Electrical Technology" },
  "66774": { name: "Transmission & Distribution of Electrical Power-2", dept: "Electrical Technology" },
  "66775": { name: "Testing & Maintenance of Electrical Equipment", dept: "Electrical Technology" },
  "66781": { name: "Industrial Training", dept: "Electrical Technology" },
  "66811": { name: "Basic Electronics", dept: "Electrical Technology" },
  "66845": { name: "Industrial Electronics", dept: "Electrical Technology" },
  "66856": { name: "Digital Electronics & Microprocessor", dept: "Electrical Technology" },
  "66863": { name: "Instrumentation & Process Control", dept: "Electrical Technology" },
  "66867": { name: "Communication Engineering", dept: "Electrical Technology" },
  "66868": { name: "Micro Controller & PLC", dept: "Electrical Technology" },
  "66823": { name: "Analog Electronics", dept: "Electrical Technology" },
  "66842": { name: "Principles of Digital Electronics", dept: "Electrical Technology" },
  "67045": { name: "Applied Mechanics", dept: "Electrical Technology" },

  // ═══════════════════════════════════════════════════════════════════════════
  // ELECTRONICS TECHNOLOGY (Department Code 68)
  // ═══════════════════════════════════════════════════════════════════════════

  // 2016 Regulation — Electronics (668xx)
  "66841": { name: "Digital Electronics-I", dept: "Electronics Technology" },
  "66843": { name: "Electronic Measuring Instruments", dept: "Electronics Technology" },
  "66851": { name: "Television & Radio Engineering", dept: "Electronics Technology" },
  "66852": { name: "Electronic Measuring Instruments-II", dept: "Electronics Technology" },
  "66853": { name: "Advanced Communication Engineering", dept: "Electronics Technology" },
  "66854": { name: "Advanced Digital Electronics", dept: "Electronics Technology" },
  "66855": { name: "Consumer Electronics", dept: "Electronics Technology" },
  "66861": { name: "Electronic Measurements", dept: "Electronics Technology" },
  "66862": { name: "TV Broadcasting and Studio", dept: "Electronics Technology" },
  "66864": { name: "Microcontroller & Embedded System", dept: "Electronics Technology" },
  "66865": { name: "Biomedical Instrumentation", dept: "Electronics Technology" },
  "66871": { name: "Communication System-I", dept: "Electronics Technology" },
  "66872": { name: "Communication System-II", dept: "Electronics Technology" },
  "66873": { name: "Satellite & Optical Fiber Communication", dept: "Electronics Technology" },
  "66874": { name: "Telecommunication Switching System", dept: "Electronics Technology" },
  "66881": { name: "Industrial Training", dept: "Electronics Technology" },
  "68643": { name: "Electronic Measurement", dept: "Electronics Technology" },
  "68661": { name: "Digital Communications", dept: "Electronics Technology" },

  // ═══════════════════════════════════════════════════════════════════════════
  // TELECOMMUNICATIONS TECHNOLOGY (Department Code 70/71)
  // ═══════════════════════════════════════════════════════════════════════════

  // 2016 Regulation — Telecom (670xx/671xx)
  "67041": { name: "Data & Telecommunication", dept: "Telecommunications Technology" },
  "67051": { name: "Mobile Communication", dept: "Telecommunications Technology" },
  "67061": { name: "Transmission Engineering", dept: "Telecommunications Technology" },
  "67062": { name: "Switching Engineering", dept: "Telecommunications Technology" },
  "67064": { name: "Optical Fiber Communication", dept: "Telecommunications Technology" },
  "67071": { name: "Computer Networks & Services", dept: "Telecommunications Technology" },
  "67072": { name: "IP Telephony", dept: "Telecommunications Technology" },
  "67073": { name: "Broadband Communication", dept: "Telecommunications Technology" },
  "67141": { name: "Microwave Communication", dept: "Telecommunications Technology" },
  "67151": { name: "Telecom Network Management", dept: "Telecommunications Technology" },
  "67171": { name: "Wireless Communication", dept: "Telecommunications Technology" },

  // ═══════════════════════════════════════════════════════════════════════════
  // MECHANICAL TECHNOLOGY
  // ═══════════════════════════════════════════════════════════════════════════

  "27011": { name: "Workshop Technology", dept: "Mechanical Technology" },
  "27012": { name: "Basic Workshop Practice", dept: "Mechanical Technology" },
  "27041": { name: "Engineering Mechanics", dept: "Mechanical Technology" },
  "27044": { name: "Applied Mechanics", dept: "Mechanical Technology" },
  "27051": { name: "Fluid Mechanics & Machineries", dept: "Mechanical Technology" },
  "27061": { name: "Strength of Materials", dept: "Mechanical Technology" },
  "27071": { name: "Design of Machine Elements", dept: "Mechanical Technology" },
  "27131": { name: "Engineering Thermodynamics", dept: "Mechanical Technology" },
  "27161": { name: "Engine Overhauling, Inspection & Testing", dept: "Mechanical Technology" },
  "27171": { name: "Service Station Operation & Estimating", dept: "Mechanical Technology" },

  // 2022 Regulation — Automobile Technology (262xx)
  "26241": { name: "Automotive Body Building", dept: "Automobile Technology" },

  // 2022 Regulation — Chemical Technology (263xx)
  "26355": { name: "Refrigeration & Cold Storage", dept: "Chemical Technology" },
  "26364": { name: "Industrial Stoichiometry & Thermodynamics", dept: "Chemical Technology" },
  "26365": { name: "Instrumental Methods of Analysis", dept: "Chemical Technology" },

  // 2022 Regulation — Civil Technology updates (264xx / 288xx)
  "26447": { name: "Basic Estimating & Costing", dept: "Civil Technology" },
  "28861": { name: "Advanced Construction", dept: "Civil Technology" },

  // 2022 Regulation — Electrical Technology updates (267xx)
  "26762": { name: "Transmission and Distribution of Electrical Power-I", dept: "Electrical Technology" },
  "26764": { name: "Transmission and Distribution of Electrical Power", dept: "Electrical Technology" },
  "26771": { name: "AC Machine-II", dept: "Electrical Technology" },
  "26773": { name: "Switch Gear and Protection", dept: "Electrical Technology" },

  // 2022 Regulation — Electronics Technology updates (268xx)
  "26821": { name: "Electronic Devices and Circuits", dept: "Electronics Technology" },
  "26831": { name: "Digital Electronics-I", dept: "Electronics Technology" },
  "26832": { name: "Power Electronics", dept: "Electronics Technology" },
  "26841": { name: "Digital Electronics-II", dept: "Electronics Technology" },
  "26843": { name: "Networks, Filters and Transmission lines", dept: "Electronics Technology" },
  "26851": { name: "Television Engineering", dept: "Electronics Technology" },
  "26852": { name: "Electronic Appliances", dept: "Electronics Technology" },
  "26861": { name: "TV Studio and Broadcasting", dept: "Electronics Technology" },
  "26862": { name: "Microcontroller and Embedded System", dept: "Electronics Technology" },

  // 2022 Regulation — Food Technology (269xx)
  "26932": { name: "Food Industrial Chemistry", dept: "Food Technology" },
  "26952": { name: "Food Preservation-II", dept: "Food Technology" },
  "26954": { name: "Food & Beverage Products", dept: "Food Technology" },
  "26961": { name: "Food Engineering Operation-I", dept: "Food Technology" },
  "26963": { name: "Bakery Products", dept: "Food Technology" },
  "26964": { name: "Food Adulteration & Toxicology", dept: "Food Technology" },

  // 2022 Regulation — Mechanical Technology updates (270xx)
  "27021": { name: "Mechanical Engineering Drawing", dept: "Mechanical Technology" },
  "27042": { name: "Machine Shop Practice-III", dept: "Mechanical Technology" },
  "27043": { name: "Metallurgy", dept: "Mechanical Technology" },
  "27053": { name: "Advanced Welding-I", dept: "Mechanical Technology" },
  "27055": { name: "Manufacturing Process", dept: "Mechanical Technology" },
  "27062": { name: "Mechanical Measurement & Metrology", dept: "Mechanical Technology" },
  "27063": { name: "CAD & CAM", dept: "Mechanical Technology" },
  "27065": { name: "Plant Engineering & Maintenance", dept: "Mechanical Technology" },
  "27073": { name: "Heat Treatment of Metal", dept: "Mechanical Technology" },
  "29231": { name: "Mechatronics & PLC", dept: "Mechanical Technology" },

  // 2022 Regulation — Power Technology (271xx)
  "27111": { name: "Power Engineering Fundamentals", dept: "Power Technology" },
  "27151": { name: "Fundamental of Hybrid & Electric Vehicle", dept: "Power Technology" },
  "27152": { name: "Power Plant Engineering", dept: "Power Technology" },

  // 2022 Regulation — RAC Technology (272xx)
  "27231": { name: "RAC Cycles & Components", dept: "RAC Technology" },
  "27252": { name: "Commercial & Industrial RAC", dept: "RAC Technology" },
  "27261": { name: "Advanced Refrigeration and Air conditioning", dept: "RAC Technology" },

  // 2022 Regulation — Marine Technology (279xx)
  "27941": { name: "Fluid Mechanics & Hydraulic Machinery", dept: "Marine Technology" },
  "27942": { name: "Marine IC Engine-II", dept: "Marine Technology" },
  "27954": { name: "Marine IC Engine Operation & Maintenance", dept: "Marine Technology" },
  "27961": { name: "Power System Protection", dept: "Marine Technology" },
  "27962": { name: "Marine Electrical Installation & Instrumentation", dept: "Marine Technology" },
  "27963": { name: "Shipboard Deck machinery, Out-fittings & Bridge Equipment", dept: "Marine Technology" },
  "27964": { name: "Marine Propulsion & Steering System", dept: "Marine Technology" },
  "27965": { name: "Marine Environmental Science", dept: "Marine Technology" },

  // 2022 Regulation — Shipbuilding Technology (280xx)
  "28021": { name: "General Ship Knowledge", dept: "Shipbuilding Technology" },
  "28061": { name: "Ship Design", dept: "Shipbuilding Technology" },

  // 2022 Regulation — CST updates (285xx)
  "28533": { name: "IT Support Services", dept: "Computer Science & Technology" },
  "28567": { name: "Programming in C", dept: "Computer Science & Technology" },
  "28572": { name: "Network Administration & Services", dept: "Computer Science & Technology" },
  "28573": { name: "Cyber Security & Ethics", dept: "Computer Science & Technology" },
  "28575": { name: "Multimedia & Animation", dept: "Computer Science & Technology" },

  // 2022 Regulation — Electromedical Technology (286xx)
  "28621": { name: "Basic Biomedical Engineering", dept: "Electromedical Technology" },
  "28632": { name: "Operating Room Equipment", dept: "Electromedical Technology" },
  "28641": { name: "Medical Transducers & Sensors", dept: "Electromedical Technology" },
  "28651": { name: "Bio-medical Instrumentation & Measurements", dept: "Electromedical Technology" },
  "28652": { name: "Dental Equipment", dept: "Electromedical Technology" },
  "28653": { name: "Anesthesia & Respiratory Equipment", dept: "Electromedical Technology" },
  "28654": { name: "Coronary & Intensive Care Unit Equipment", dept: "Electromedical Technology" },
  "28661": { name: "Robotics & Robotic Surgery", dept: "Electromedical Technology" },

  // 2016 Regulation — Power Technology (662xx / 671xx)
  "66241": { name: "Automotive Body Building", dept: "Power Technology" },
  "66253": { name: "Automobile Air-conditioning", dept: "Power Technology" },
  "66274": { name: "Vehicle Automation & Signaling", dept: "Power Technology" },
  "67142": { name: "Automotive Suspension, Brake, Steering & Transmission System", dept: "Power Technology" },
  "67153": { name: "Engine Overhauling & Inspection", dept: "Power Technology" },
  "67162": { name: "Fluid Mechanics & Machineries", dept: "Power Technology" },
  "67172": { name: "Automobile Trouble Shooting & Driving", dept: "Power Technology" },

  // 2016 Regulation — Chemical Technology (663xx)
  "66363": { name: "Industrial Stoichiometry & Thermodynamics", dept: "Chemical Technology" },

  // 2016 Regulation — Civil Technology updates (664xx)
  "66467": { name: "Basic Design of Structure", dept: "Civil Technology" },

  // 2016 Regulation — Electrical Technology updates (667xx)
  "66743": { name: "Electrical Circuits & Machines", dept: "Electrical Technology" },
  "66764": { name: "Transmission & Distribution of Electrical Power", dept: "Electrical Technology" },

  // 2016 Regulation — Food Technology (669xx)
  "66944": { name: "Food Chemistry", dept: "Food Technology" },
  "66973": { name: "Food Quality Control & Assurance", dept: "Food Technology" },

  // 2016 Regulation — Mechanical Technology updates (670xx)
  "67052": { name: "Mechanical Estimating & Costing", dept: "Mechanical Technology" },
  "67053": { name: "Advance Welding - 1", dept: "Mechanical Technology" },
  "67076": { name: "Mechatronics & PLC", dept: "Mechanical Technology" },

  // 2016 Regulation — Shipbuilding Technology (680xx)
  "68081": { name: "Industrial Training", dept: "Shipbuilding Technology" },

  // 2016 Regulation — Electronics Technology updates (686xx)
  "68662": { name: "TV Broadcasting and Studio", dept: "Electronics Technology" },
  "68663": { name: "Instrumentation & Process Control", dept: "Electronics Technology" },
  "68665": { name: "Electronic Project-1", dept: "Electronics Technology" },
  "68671": { name: "Computer Control & Robotics", dept: "Electronics Technology" },
  "68672": { name: "Microwave, Radar & Navigation Aids", dept: "Electronics Technology" },

  // 2016 Regulation — Architecture Technology (687xx)
  "68774": { name: "AIDT Professional Practice", dept: "Architecture Technology" }
};

/** Get the subject name by its code, falling back to a formatted code label */
export function getSubjectName(code: string): string {
  const baseCode = code.replace(/\([^)]+\)/g, "").trim();
  return BTEB_SUBJECTS[baseCode]?.name ?? `Subject Code: ${baseCode}`;
}

/** Get the department name from the subject code */
export function getSubjectDepartment(code: string): string {
  const baseCode = code.replace(/\([^)]+\)/g, "").trim();
  return BTEB_SUBJECTS[baseCode]?.dept ?? "General";
}

/**
 * Infer a student's department from their list of referred subject codes.
 * Uses majority-vote across all recognizable (non-General, non-Shared) subject codes.
 * Shared codes (like Basic Electricity, Workshop Technology) appear in ALL departments
 * and should NOT be used for department detection.
 */
export function detectDepartmentFromSubjects(subjectCodes: string[]): string {
  const counts: Record<string, number> = {};

  subjectCodes.forEach((code) => {
    const dept = getSubjectDepartment(code);
    // Skip General AND Shared codes — they don't help identify the department
    if (dept !== "General" && dept !== "Shared") {
      counts[dept] = (counts[dept] ?? 0) + 1;
    }
  });

  if (Object.keys(counts).length === 0) return "General Technology";

  // Return department with most matching codes
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "General Technology";
}
