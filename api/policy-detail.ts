// GET /api/policy-detail?id=xxx - 获取政策详情（全部内容免费开放）

import type { VercelRequest, VercelResponse } from "@vercel/node";

// 政策数据（与 api/policies.ts 保持一致）
interface Policy {
  id: string;
  titleEn: string;
  titleZh: string;
  category: string;
  summaryEn: string;
  detailEn: string;
  eligibilityEn: string[];
  amount: string;
  source: string;
  sourceUrl: string;
  city: string;
  updatedAt: string;
}

const policyCategories: Record<string, string> = {
  tax: "Tax & Finance",
  "social-insurance": "Social Insurance",
  housing: "Housing",
  healthcare: "Healthcare",
  education: "Education",
  subsidy: "Subsidies & Benefits",
  entrepreneurship: "Entrepreneurship",
  transportation: "Transportation",
  "elderly-care": "Elderly Care",
  childcare: "Childcare",
};

const policies: Policy[] = [
  {
    id: "individual-income-tax-deductions",
    titleEn: "Individual Income Tax Deductions for Foreigners",
    titleZh: "外籍个人个人所得税专项附加扣除",
    category: "tax",
    summaryEn:
      "Foreign nationals working in China can claim special additional deductions for housing, education, and dependents, significantly reducing their taxable income under the updated IIT law.",
    detailEn:
      "Since the 2019 Individual Income Tax reform, foreign employees in China are eligible for the same special additional deductions as Chinese citizens. These deductions cover six categories: children's education, continuing education, housing loan interest or rent, elderly care,大病医疗 (major medical expenses), and infant care for children under 3 years old.\n\nForeigners can choose between the existing housing allowance exemption (up to a reasonable amount) and the new housing deduction. The housing allowance exemption is often more beneficial for high-earning expats, as it can cover actual rental costs without a cap in many cities. However, starting from 2022, the transition period ended, and foreigners must choose one method.\n\nEach deduction category has specific limits. For example, the children's education deduction is ¥1,000/month per child, the housing rent deduction ranges from ¥800 to ¥1,500/month depending on the city, and elderly care allows up to ¥3,000/month. These deductions are applied before calculating the final tax liability.\n\nTo claim these deductions, you need to file through your employer's withholding agent or submit directly via the Individual Income Tax APP (个人所得税APP). Proper documentation such as rental contracts, school enrollment certificates, and family relationship proofs may be required.",
    eligibilityEn: [
      "Hold a valid work permit and residence permit in China",
      "Earn income subject to Chinese Individual Income Tax",
      "Have qualifying expenses in deduction categories",
      "File annual tax reconciliation if applicable",
    ],
    amount: "Up to ¥18,000/year in deductions",
    source: "State Taxation Administration",
    sourceUrl: "https://www.chinatax.gov.cn",
    city: "National",
    updatedAt: "2026-01-15",
  },
  {
    id: "social-insurance-foreign-employees",
    titleEn: "Social Insurance for Foreign Employees",
    titleZh: "外籍员工社会保险",
    category: "social-insurance",
    summaryEn:
      "Foreign employees who have obtained work permits and residence permits are required to participate in China's social insurance system, including pension, medical, unemployment, work injury, and maternity insurance.",
    detailEn:
      "Under the Interim Measures for Participation in Social Insurance by Foreigners Employed in China (2011), all foreign nationals legally employed in China must participate in the social insurance system. This applies to foreigners who have obtained the Foreigner's Work Permit and Residence Permit for Employment.\n\nThe five types of social insurance are: basic pension insurance (employer 16%, employee 8%), basic medical insurance (employer ~9.8%, employee 2%), unemployment insurance (employer ~0.5%, employee ~0.5%), work injury insurance (employer 0.2-1.9%, employee 0%), and maternity insurance (employer ~0.8%, employee 0%). The exact percentages vary by city.\n\nSocial insurance contributions are based on the employee's declared salary, subject to local upper and lower limits. For example, in Shanghai in 2024, the contribution base ranges from ¥7,310 to ¥36,549 per month. Both employer and employee contributions are mandatory.\n\nSome countries have bilateral social insurance agreements with China (e.g., Germany, South Korea, Denmark, Finland, Canada, Switzerland, Netherlands, Spain, Luxembourg, Japan, Serbia), which may allow exemption from certain Chinese social insurance contributions. Check if your country has such an agreement.",
    eligibilityEn: [
      "Hold a valid Foreigner's Work Permit",
      "Hold a Residence Permit for Employment",
      "Legally employed by a Chinese entity",
      "Not covered by a bilateral social insurance exemption agreement",
    ],
    amount: "Employee contribution: ~10.5% of salary",
    source: "Ministry of Human Resources and Social Security",
    sourceUrl: "https://www.mohrss.gov.cn",
    city: "National",
    updatedAt: "2026-02-01",
  },
  {
    id: "housing-provident-fund-expats",
    titleEn: "Housing Provident Fund for Expats",
    titleZh: "外籍人士住房公积金",
    category: "housing",
    summaryEn:
      "In several major cities, foreign employees can voluntarily participate in the Housing Provident Fund, which provides low-interest housing loans and can be withdrawn for rent payments.",
    detailEn:
      "The Housing Provident Fund (住房公积金, HPF) is a mandatory savings scheme for Chinese employees, but foreign nationals' participation varies by city. In Shanghai, Shenzhen, and several other tier-1 cities, foreign employees can voluntarily enroll in the HPF through their employer.\n\nBoth the employer and employee each contribute 5-12% of the employee's salary to the fund. The contributions are tax-deductible and earn interest at a rate set by the People's Bank of China (currently 1.5% for balances up to one year, 2.1% for balances over one year).\n\nThe main benefit of HPF participation is access to low-interest housing loans. As of 2024, the HPF loan rate for first homes is 2.85% for loans up to 5 years and 3.1% for loans over 5 years, significantly lower than commercial mortgage rates. The maximum loan amount varies by city — for example, ¥1,000,000 for a family in Shanghai.\n\nYou can also withdraw from your HPF account for rent payments, home renovation, or retirement. When leaving China permanently, you can withdraw the full balance. Check with your local HPF management center for specific procedures.",
    eligibilityEn: [
      "Legally employed foreign national with work permit",
      "Employer willing to participate in the HPF scheme",
      "City allows voluntary enrollment for foreigners",
      "Valid employment contract with a local entity",
    ],
    amount: "5-12% of salary (matched by employer)",
    source: "Housing Provident Fund Management Centers",
    sourceUrl: "https://www.mohrss.gov.cn",
    city: "Shanghai, Shenzhen, and select cities",
    updatedAt: "2026-01-20",
  },
  {
    id: "childcare-subsidy",
    titleEn: "Childcare Subsidy (育儿补贴)",
    titleZh: "育儿补贴",
    category: "childcare",
    summaryEn:
      "Multiple Chinese cities offer monthly childcare subsidies for families with young children, aiming to reduce the financial burden of raising children and encourage higher birth rates.",
    detailEn:
      "In response to China's declining birth rate, many cities and provinces have introduced childcare subsidies (育儿补贴). These are direct cash payments to families with children, particularly for second and third children. The amounts and eligibility criteria vary significantly by region.\n\nFor example, Shenzhen offers ¥1,900/year for a first child, ¥3,500/year for a second child, and ¥5,700/year for a third child until the child reaches age 3. Hangzhou provides a one-time payment of ¥2,000 for a second child and ¥5,000 for a third child. Wenzhou gives ¥1,000/month for a second child and ¥1,500/month for a third child for 2 years.\n\nForeign nationals holding residence permits may be eligible in some cities if their children are born in China and have proper household registration or birth certificates. The key requirement is typically that at least one parent has been contributing to local social insurance for a specified period.\n\nApplication processes vary but generally require the child's birth certificate, parents' identification documents, proof of social insurance contributions, and the child's household registration or residence documentation. Check with your local community service center (社区服务中心) for specific requirements.",
    eligibilityEn: [
      "At least one parent holds a valid residence permit",
      "Child born in China with proper birth certificate",
      "Parent contributing to local social insurance",
      "Meet city-specific income or residency requirements",
    ],
    amount: "¥1,000 - ¥5,700/year depending on city and child order",
    source: "Local Municipal Governments",
    sourceUrl: "https://www.sz.gov.cn",
    city: "Shenzhen, Hangzhou, Wenzhou, and others",
    updatedAt: "2026-03-01",
  },
  {
    id: "home-appliance-trade-in-subsidy",
    titleEn: "Home Appliance Trade-in Subsidy (家电以旧换新)",
    titleZh: "家电以旧换新补贴",
    category: "subsidy",
    summaryEn:
      "China's national trade-in program offers subsidies of 15-20% off when replacing old home appliances with new energy-efficient models, available to all residents including foreign nationals.",
    detailEn:
      "The Home Appliance Trade-in Subsidy program (家电以旧换新) was expanded nationally in 2024 as part of China's push for green consumption and economic stimulus. The program offers direct subsidies when consumers trade in old appliances for new, energy-efficient models.\n\nThe subsidy covers eight major categories: refrigerators, washing machines, televisions, air conditioners, computers, water heaters, cooktops, and water purifiers. The subsidy rate is typically 15% of the new product price, with an additional 5% for products meeting the highest energy efficiency standards. Maximum subsidy per item is generally ¥2,000.\n\nForeign nationals with valid residence permits can participate in this program. You need to purchase qualifying products from designated retailers (both online platforms like JD.com and offline stores participate) and submit the old appliance for recycling. The subsidy is typically applied as an instant discount at checkout or as a rebate.\n\nThe program has been extended through 2025 and may continue. Some cities offer additional local subsidies on top of the national program. For example, Shanghai offers an extra 10% subsidy for smart home appliances, bringing the total potential discount to 30%.",
    eligibilityEn: [
      "Valid residence permit or ID document",
      "Purchase from designated participating retailers",
      "Trade in an old appliance of the same category",
      "New appliance meets energy efficiency standards",
    ],
    amount: "15-20% off, up to ¥2,000 per item",
    source: "Ministry of Commerce",
    sourceUrl: "https://www.mofcom.gov.cn",
    city: "National",
    updatedAt: "2026-02-15",
  },
  {
    id: "new-energy-vehicle-subsidy",
    titleEn: "New Energy Vehicle Subsidy (新能源汽车补贴)",
    titleZh: "新能源汽车补贴",
    category: "transportation",
    summaryEn:
      "China offers purchase tax exemptions and various subsidies for new energy vehicles (NEVs), including electric and plug-in hybrid cars, making them significantly cheaper than equivalent gasoline vehicles.",
    detailEn:
      "China has been the world's largest market for new energy vehicles (NEVs) thanks to strong government support. While the direct national purchase subsidy was phased out at the end of 2022, several significant benefits remain for NEV buyers.\n\nThe most substantial benefit is the purchase tax exemption. NEVs are exempt from the vehicle purchase tax (normally 10% of the vehicle price) through the end of 2027. For a ¥200,000 EV, this saves ¥20,000. Additionally, NEVs are exempt from the vehicle and vessel tax (车船税) in most provinces.\n\nMany cities offer additional incentives. Shanghai provides a free license plate for NEVs (worth approximately ¥90,000 at auction for gasoline cars). Beijing gives NEV owners priority in the license plate lottery. Shenzhen offers charging subsidies and free parking for NEVs in certain areas. Guangzhou provides a direct subsidy of ¥10,000-¥30,000 for NEV purchases.\n\nForeign nationals with valid residence permits can purchase NEVs and enjoy these benefits. The license plate advantage alone makes NEVs extremely attractive in plate-restricted cities. Note that some cities may have different rules for foreigners regarding license plate registration.",
    eligibilityEn: [
      "Valid residence permit and work permit",
      "Valid Chinese driver's license",
      "Purchase a qualifying NEV model from the MIIT catalog",
      "Register the vehicle in the local DMV",
    ],
    amount: "Purchase tax exemption (saves ~10% of vehicle price) + city incentives",
    source: "Ministry of Industry and Information Technology",
    sourceUrl: "https://www.miit.gov.cn",
    city: "National with city-specific additions",
    updatedAt: "2026-01-10",
  },
  {
    id: "talent-housing-subsidy",
    titleEn: "Talent Housing Subsidy (人才公寓补贴)",
    titleZh: "人才公寓补贴",
    category: "housing",
    summaryEn:
      "Major Chinese cities offer housing subsidies and discounted talent apartments for qualified foreign professionals, particularly those in high-demand industries or with advanced degrees.",
    detailEn:
      "China's talent attraction policies include significant housing benefits for qualified foreign professionals. These programs, known as 人才政策 (talent policies), vary by city but generally offer rent subsidies, discounted talent apartments, or even free housing for a limited period.\n\nShanghai's Pudong New Area offers talent apartments at 30-50% below market rate for qualified professionals, with monthly subsidies of ¥1,000-¥3,000 depending on talent classification. Shenzhen provides a one-time housing subsidy of ¥15,000-¥30,000 for newly introduced talent with bachelor's degrees or above. Hangzhou offers up to ¥1,000/month in rental subsidies for talent with master's degrees.\n\nThe talent classification system typically has multiple tiers. A-class (top-tier) talent may receive free housing or subsidies of ¥5,000+/month. B-class talent may get ¥3,000-¥5,000/month. C and D-class talent receive progressively lower amounts. Classification is based on education, professional achievements, salary level, and industry demand.\n\nForeign nationals can apply through local talent service centers (人才服务中心). Required documents typically include degree certificates (authenticated), employment contract, salary proof, and professional qualifications. The application process can take 1-3 months.",
    eligibilityEn: [
      "Hold a valid work permit (typically R-visa or Z-visa for high-tier talent)",
      "Bachelor's degree or above from a recognized institution",
      "Employed in a targeted industry (tech, finance, biotech, etc.)",
      "Meet city-specific income or achievement thresholds",
    ],
    amount: "¥1,000 - ¥5,000+/month depending on talent tier",
    source: "Local Talent Service Centers",
    sourceUrl: "https://www.shanghai.gov.cn",
    city: "Shanghai, Shenzhen, Hangzhou, Beijing, and others",
    updatedAt: "2026-03-10",
  },
  {
    id: "medical-insurance-foreign-residents",
    titleEn: "Medical Insurance for Foreign Residents",
    titleZh: "外籍居民医疗保险",
    category: "healthcare",
    summaryEn:
      "Foreign residents enrolled in China's basic medical insurance enjoy the same coverage as Chinese citizens, including outpatient, inpatient, and pharmacy benefits with reimbursement rates up to 90%.",
    detailEn:
      "Foreign nationals who participate in China's basic medical insurance system through their employer receive the same coverage as Chinese citizens. This includes outpatient care, inpatient treatment, emergency care, and prescription medications from designated pharmacies.\n\nThe reimbursement rates depend on the type of care and the hospital level. For inpatient care at community hospitals, the reimbursement rate can reach 90%. At tier-3 (top-level) hospitals, the rate is typically 70-85% after deductibles. Outpatient reimbursement starts after meeting the annual deductible (¥500-¥1,500 depending on the city).\n\nChina's medical insurance also covers a growing list of chronic disease treatments and essential medications. The National Reimbursement Drug Catalog (NRDL) is updated annually, and as of 2024, includes over 3,000 medications. Negotiated prices for many innovative drugs can be 50-80% lower than market prices.\n\nFor those not covered by employer-based insurance, some cities allow foreign residents to enroll in urban resident medical insurance (城乡居民医保) by paying an annual premium (typically ¥700-¥1,500/year). This provides basic coverage but at lower reimbursement rates than employee insurance.",
    eligibilityEn: [
      "Enrolled in social insurance through employer, OR",
      "Hold a residence permit and enroll in resident medical insurance",
      "Seek treatment at designated medical insurance hospitals",
      "Medications from the NRDL list",
    ],
    amount: "Reimbursement up to 90% of covered expenses",
    source: "National Healthcare Security Administration",
    sourceUrl: "https://www.nhsa.gov.cn",
    city: "National",
    updatedAt: "2026-02-20",
  },
  {
    id: "education-subsidy-children-expats",
    titleEn: "Education Subsidies for Children of Expats",
    titleZh: "外籍人员子女教育补贴",
    category: "education",
    summaryEn:
      "Children of foreign nationals working in China may attend local public schools tuition-free or receive subsidies for international school fees, depending on the city and the parent's talent classification.",
    detailEn:
      "Education benefits for expat children vary significantly by city and the parent's qualification level. In general, foreign nationals' children have three schooling options: international schools, bilingual private schools, and local public schools.\n\nChildren of high-tier talent (A and B-class) in many cities can attend local public schools tuition-free, just like Chinese citizens. Cities like Shanghai, Shenzhen, and Hangzhou have specific policies allowing talent-classified foreigners to enroll their children in designated public schools without paying the international student fees.\n\nSome cities offer direct education subsidies. For example, Suzhou Industrial Park provides an education allowance of ¥30,000-¥50,000/year per child for qualified foreign talent. Chengdu's Hi-tech Zone offers a 50% subsidy on international school tuition for talent in key industries, capped at ¥50,000/year.\n\nFor the IIT special additional deduction, parents can claim ¥1,000/month per child for education expenses from preschool through doctoral studies. This deduction applies regardless of whether the child studies in China or abroad, as long as the parent is subject to Chinese IIT.",
    eligibilityEn: [
      "Parent holds a valid work permit and residence permit",
      "Parent classified as talent (for public school access and subsidies)",
      "Child holds a valid dependent residence permit",
      "Meet city-specific enrollment requirements",
    ],
    amount: "¥1,000/month tax deduction + up to ¥50,000/year city subsidies",
    source: "Local Education Bureaus",
    sourceUrl: "https://edu.sh.gov.cn",
    city: "Shanghai, Shenzhen, Hangzhou, Suzhou, Chengdu",
    updatedAt: "2026-01-25",
  },
  {
    id: "startup-subsidy-foreign-entrepreneurs",
    titleEn: "Startup Subsidy for Foreign Entrepreneurs",
    titleZh: "外籍创业补贴",
    category: "entrepreneurship",
    summaryEn:
      "Foreign entrepreneurs in China can access startup subsidies, free incubator space, and one-time grants of ¥50,000-¥500,000 when establishing businesses in designated innovation zones.",
    detailEn:
      "China actively encourages foreign entrepreneurs through various startup support programs. The most notable is the Foreign Talent Startup Visa (R-visa) program, which provides streamlined visa processing for foreign founders. Multiple cities offer financial incentives on top of this.\n\nShanghai's Zhangjiang Hi-Tech Park offers a one-time startup grant of ¥100,000-¥500,000 for foreign-founded companies in biotech, AI, or integrated circuits, plus up to 3 years of free office space in incubators. Shenzhen's Qianhai zone provides ¥50,000-¥300,000 in startup subsidies and a rent subsidy of ¥2,000/month for the first 3 years.\n\nBeijing's Zhongguancun Science Park has a dedicated foreign entrepreneur program with grants up to ¥500,000 for qualifying startups. Hangzhou's Dream Village (梦想小镇) offers ¥200,000 in startup funding and free co-working space for 2 years. Chengdu's Tianfu New Area provides ¥100,000-¥300,000 grants plus housing subsidies.\n\nTo qualify, foreign entrepreneurs typically need a viable business plan, relevant industry experience, and must register their company in the designated zone. The application process involves submitting to the local talent or innovation authority, with review periods of 2-6 months.",
    eligibilityEn: [
      "Hold or eligible for an R-visa (Talent Visa)",
      "Register a company in a designated innovation zone",
      "Business in a targeted industry (tech, biotech, green energy, etc.)",
      "Viable business plan with market potential",
    ],
    amount: "¥50,000 - ¥500,000 one-time grant + free office space",
    source: "Local Innovation and Technology Commissions",
    sourceUrl: "https://www.zhangjiang.net",
    city: "Shanghai, Shenzhen, Beijing, Hangzhou, Chengdu",
    updatedAt: "2026-03-05",
  },
  {
    id: "foreign-talent-visa-r-visa",
    titleEn: "Foreign Talent Visa (R-Visa) Benefits",
    titleZh: "外国人才签证(R字签证)优惠",
    category: "tax",
    summaryEn:
      "Holders of the R-visa (Foreign Talent Visa) enjoy tax exemptions on certain allowances, fast-track residence permits, and preferential treatment in housing, education, and healthcare.",
    detailEn:
      "The R-visa is China's top-tier talent visa, designed for highly qualified foreign professionals. It offers a range of benefits beyond standard work visas, including significant tax advantages and streamlined government services.\n\nR-visa holders can claim tax exemptions on housing allowances, language training expenses, and children's education allowances — benefits that were previously available to all foreign workers but are now increasingly restricted to R-visa holders. The housing allowance exemption alone can save ¥30,000-¥100,000+ annually in taxes for high-earning expats.\n\nThe R-visa also provides a fast-track green channel for residence permit applications, with processing times as short as 5 working days instead of the standard 15-30 days. R-visa holders can obtain residence permits valid for up to 5 years, compared to the typical 1-year permits for regular Z-visa holders.\n\nAdditional benefits include priority access to talent housing, priority school enrollment for children, dedicated healthcare channels at top hospitals, and simplified customs procedures for personal belongings when entering China.",
    eligibilityEn: [
      "Meet the criteria for high-end foreign talent (Category A)",
      "Earn a salary above the local high-income threshold",
      "Hold advanced degrees or have significant professional achievements",
      "Work in a nationally supported industry",
    ],
    amount: "Tax savings of ¥30,000 - ¥100,000+/year on allowances",
    source: "State Administration of Foreign Experts Affairs",
    sourceUrl: "https://www.most.gov.cn",
    city: "National",
    updatedAt: "2026-02-10",
  },
  {
    id: "high-speed-rail-foreign-pass",
    titleEn: "High-Speed Rail Foreigner Pass Discount",
    titleZh: "外籍人士高铁优惠",
    category: "transportation",
    summaryEn:
      "Foreign residents can enjoy discounted high-speed rail tickets through seasonal promotions and the 12306 app's foreigner-friendly features, including passport-based booking and e-ticketing.",
    detailEn:
      "China Railway has made significant improvements to serve foreign passengers. Foreign nationals can now book high-speed rail tickets using their passport numbers through the 12306 app and website, which supports English interface. E-ticketing means no need to collect paper tickets — just scan your passport at the gate.\n\nSeasonal promotions offer discounts of 10-30% on select routes during off-peak periods. The 12306 platform regularly runs promotions such as the 春运 early bird discount, summer travel deals, and mid-week specials. Foreign residents with verified 12306 accounts can access these promotions.\n\nFor frequent travelers, the 中国铁路畅行会员 (China Railway Changxing Member) program offers points for every trip that can be redeemed for free tickets. Foreign nationals can register using their passport. Points accumulate at approximately 5 points per yuan spent, and 10,000 points can be redeemed for a ticket worth approximately ¥100.\n\nSome cities also offer integrated transportation cards that combine subway, bus, and rail discounts. For example, Shanghai's transportation card offers a 10% discount after monthly spending exceeds ¥70 on the metro.",
    eligibilityEn: [
      "Hold a valid passport with residence permit",
      "Register a 12306 account with passport verification",
      "Book tickets through official channels",
      "Travel during promotional periods for discounts",
    ],
    amount: "10-30% off select routes during promotions",
    source: "China Railway",
    sourceUrl: "https://www.12306.cn",
    city: "National",
    updatedAt: "2026-01-30",
  },
  {
    id: "elderly-care-deduction",
    titleEn: "Elderly Care Tax Deduction",
    titleZh: "赡养老人专项附加扣除",
    category: "elderly-care",
    summaryEn:
      "Foreign taxpayers supporting parents over 60 can claim a monthly deduction of ¥1,500-¥3,000 from their taxable income, whether the parents live in China or abroad.",
    detailEn:
      "The elderly care special additional deduction (赡养老人专项附加扣除) allows taxpayers who support parents aged 60 or above to deduct ¥3,000/month if they are the only child, or ¥1,500/month each if there are siblings sharing the support responsibility.\n\nThis deduction is available to foreign nationals paying Chinese IIT, even if the supported parents live outside China. The key requirement is that the taxpayer provides financial support to the parent(s). Documentation such as proof of remittances or financial support may be requested during tax audits.\n\nFor foreign nationals, this deduction can be particularly valuable as it directly reduces taxable income. At the highest tax bracket (45%), the ¥3,000/month deduction saves approximately ¥16,200/year in taxes. Even at the 20% bracket, the annual savings are around ¥7,200.\n\nThe deduction can be claimed through the employer's withholding process or during the annual tax reconciliation (March 1 - June 30 each year). You need to declare the parents' information including their ID numbers and ages.",
    eligibilityEn: [
      "Subject to Chinese Individual Income Tax",
      "Have at least one parent aged 60 or above",
      "Provide financial support to the parent(s)",
      "Declare parent information during tax filing",
    ],
    amount: "¥1,500 - ¥3,000/month deduction (saves ¥3,600 - ¥16,200/year in tax)",
    source: "State Taxation Administration",
    sourceUrl: "https://www.chinatax.gov.cn",
    city: "National",
    updatedAt: "2026-02-05",
  },
  {
    id: "rental-housing-deduction",
    titleEn: "Rental Housing Tax Deduction",
    titleZh: "住房租金专项附加扣除",
    category: "housing",
    summaryEn:
      "Foreign employees renting homes in China can deduct ¥800-¥1,500/month from taxable income depending on the city tier, providing significant annual tax savings.",
    detailEn:
      "The housing rent special additional deduction (住房租金专项附加扣除) allows taxpayers who do not own a home in the city where they work to deduct rental expenses from their taxable income. The deduction amount depends on the city classification.\n\nFor municipalities directly under the central government (Beijing, Shanghai, Tianjin, Chongqing), provincial capitals, and cities with over 3.5 million registered population, the deduction is ¥1,500/month. For cities with 1-3.5 million population, it's ¥1,100/month. For cities under 1 million population, it's ¥800/month.\n\nThis deduction is particularly relevant for foreign nationals, most of whom rent in China. In Shanghai or Beijing, the ¥1,500/month deduction at the 25% tax bracket saves approximately ¥4,500/year. At the 35% bracket, the savings increase to ¥6,300/year.\n\nImportant note: You cannot claim both the housing rent deduction and the housing loan interest deduction simultaneously. For most foreign renters, the rent deduction is the applicable option. You need a valid rental contract registered with the local housing authority to claim this deduction.",
    eligibilityEn: [
      "Subject to Chinese Individual Income Tax",
      "Rent a home in the city where you work",
      "Do not own a home in that city",
      "Have a registered rental contract",
    ],
    amount: "¥800 - ¥1,500/month deduction",
    source: "State Taxation Administration",
    sourceUrl: "https://www.chinatax.gov.cn",
    city: "National",
    updatedAt: "2026-01-18",
  },
  {
    id: "green-card-permanent-residence",
    titleEn: "Green Card (Permanent Residence) Benefits",
    titleZh: "中国绿卡(永久居留)福利",
    category: "social-insurance",
    summaryEn:
      "Foreign nationals with Chinese permanent residence enjoy near-citizen benefits including unrestricted employment, property purchase rights, and social insurance portability across cities.",
    detailEn:
      "China's Foreign Permanent Resident ID Card (外国人永久居留身份证), commonly known as the 'Green Card,' provides holders with extensive rights that closely mirror those of Chinese citizens. Obtaining permanent residence eliminates the need for work permits and residence permit renewals.\n\nGreen Card holders can work freely without a work permit, change employers without re-application, and enjoy the same property purchase rights as locals in cities with purchase restrictions. This is a major advantage in cities like Beijing and Shanghai, where non-residents face strict property purchase limits.\n\nSocial insurance benefits become fully portable — Green Card holders can transfer their pension and medical insurance between cities, which regular work permit holders cannot easily do. They also qualify for the same public services as locals, including public school enrollment for children and access to the public healthcare system on equal terms.\n\nThe 2023 revision of the Green Card system introduced a new card format with 18-digit numbers matching the Chinese ID card format, making it compatible with all existing systems including banking, transportation, and e-commerce platforms. Processing times have been reduced to approximately 6 months in most cities.",
    eligibilityEn: [
      "Lived in China for 5+ consecutive years (with annual stay ≥9 months)",
      "OR married to a Chinese citizen for 5+ years",
      "OR made significant investment in China (¥500,000-¥2,000,000+)",
      "OR classified as high-end talent by national standards",
    ],
    amount: "Full access to citizen-equivalent benefits",
    source: "National Immigration Administration",
    sourceUrl: "https://www.nia.gov.cn",
    city: "National",
    updatedAt: "2026-03-15",
  },
  {
    id: "digital-renminbi-subsidy",
    titleEn: "Digital RMB (e-CNY) Consumer Subsidy",
    titleZh: "数字人民币消费补贴",
    category: "subsidy",
    summaryEn:
      "Several cities distribute digital RMB (e-CNY) subsidies to residents through lottery or direct allocation, which foreign residents with verified accounts can also receive.",
    detailEn:
      "China's digital currency, e-CNY (数字人民币), has been rolled out in multiple pilot cities with various consumer subsidy programs. These programs distribute digital currency directly to residents' e-CNY wallets, which can be spent at participating merchants.\n\nPilot cities including Shenzhen, Suzhou, Xiong'an, Chengdu, Shanghai, Hainan, and others regularly run e-CNY 'red envelope' promotions. These range from ¥50-¥200 per person in lottery-style distributions to ¥500-¥1,000 in targeted subsidies for specific groups (new residents, seniors, low-income families).\n\nForeign nationals with residence permits can open e-CNY wallets through the Digital RMB APP using their passport or residence permit. While some promotions are limited to Chinese ID card holders, many city-level distributions are open to all residents with verified e-CNY wallets.\n\nIn 2024, Shenzhen distributed over ¥50 million in e-CNY subsidies, Suzhou ran multiple rounds of ¥30 million distributions, and Chengdu offered ¥100 e-CNY vouchers to all residents who completed identity verification. These programs typically run during holidays and shopping festivals.",
    eligibilityEn: [
      "Hold a valid residence permit",
      "Open a verified e-CNY wallet through the Digital RMB APP",
      "Reside in a pilot city",
      "Register during the promotion period",
    ],
    amount: "¥50 - ¥1,000 per distribution event",
    source: "People's Bank of China",
    sourceUrl: "https://www.pbc.gov.cn",
    city: "Shenzhen, Suzhou, Chengdu, Shanghai, Hainan, and other pilot cities",
    updatedAt: "2026-02-25",
  },
  {
    id: "foreign-expert-allowance",
    titleEn: "Foreign Expert Special Allowance",
    titleZh: "外国专家特殊津贴",
    category: "tax",
    summaryEn:
      "Recognized foreign experts can receive government special allowances of ¥50,000-¥200,000, which are tax-exempt, along with research funding and other preferential treatment.",
    detailEn:
      "The Chinese government provides special allowances (政府特殊津贴) to recognized foreign experts who have made significant contributions to China's development. This program is administered at both national and provincial levels.\n\nNational-level foreign expert special allowances are typically ¥100,000-¥200,000, awarded as a one-time payment. Provincial and municipal-level allowances range from ¥50,000-¥100,000. These payments are exempt from individual income tax, making them particularly valuable.\n\nBeyond the cash allowance, recognized foreign experts receive preferential treatment including priority for research funding, access to national laboratories, streamlined visa processing, and dedicated support staff. Some provinces also provide free housing, vehicle purchase privileges, and priority healthcare access.\n\nEligibility is based on significant contributions in fields such as scientific research, technology innovation, education, healthcare, or cultural exchange. Nominations are typically made by the employer and reviewed by provincial and national expert committees. The selection process is competitive, with approximately 400-500 experts selected nationally each year.",
    eligibilityEn: [
      "Made significant contributions to China's development",
      "Nominated by employer or relevant government department",
      "Work in a priority field (science, technology, education, healthcare)",
      "Minimum 3 years of work in China",
    ],
    amount: "¥50,000 - ¥200,000 (tax-exempt)",
    source: "Ministry of Science and Technology",
    sourceUrl: "https://www.most.gov.cn",
    city: "National",
    updatedAt: "2026-01-05",
  },
  {
    id: "work-injury-insurance",
    titleEn: "Work Injury Insurance for Foreign Workers",
    titleZh: "外籍员工工伤保险",
    category: "social-insurance",
    summaryEn:
      "Foreign employees are covered by China's work injury insurance, which provides full medical coverage, disability benefits, and rehabilitation support for workplace injuries or occupational diseases.",
    detailEn:
      "Work injury insurance (工伤保险) is a mandatory component of China's social insurance system that fully covers foreign employees. The employer pays the entire premium (0.2-1.9% of salary depending on industry risk level), with no employee contribution required.\n\nIf a work-related injury occurs, the insurance covers 100% of medical expenses at designated hospitals, with no deductible or co-payment. During the treatment period, the employee receives their full salary from the employer for up to 12 months (extendable to 24 months for serious cases).\n\nDisability benefits are graded on a 10-level scale. Level 1 (most severe) provides a lump sum of 27 months' salary plus a monthly disability allowance of 90% of the average monthly salary. Level 10 (least severe) provides 7 months' salary as a lump sum. Occupational disease diagnoses follow the same grading system.\n\nIn case of work-related death, the insurance provides a lump sum of approximately ¥1,036,420 (2024 national standard, adjusted annually) plus funeral expenses of approximately 6 months' local average salary, and a monthly dependency allowance for surviving family members.",
    eligibilityEn: [
      "Enrolled in social insurance through employer",
      "Injury occurred during work or work-related activities",
      "Reported within 30 days of occurrence",
      "Assessed by the labor capacity assessment committee",
    ],
    amount: "100% medical coverage + up to 27 months' salary for disability",
    source: "Ministry of Human Resources and Social Security",
    sourceUrl: "https://www.mohrss.gov.cn",
    city: "National",
    updatedAt: "2026-02-15",
  },
  {
    id: "infant-care-deduction",
    titleEn: "Infant Care Tax Deduction (Under 3)",
    titleZh: "3岁以下婴幼儿照护专项附加扣除",
    category: "childcare",
    summaryEn:
      "Parents with children under 3 years old can deduct ¥2,000/month per child from taxable income, a policy specifically designed to ease the financial burden of infant care.",
    detailEn:
      "The infant care special additional deduction (3岁以下婴幼儿照护专项附加扣除) was introduced in 2022 to support families with very young children. Taxpayers can deduct ¥2,000/month per child under 3 years old, which can be shared between spouses (50/50) or claimed entirely by one parent.\n\nThis deduction is particularly valuable for foreign nationals with young children in China. At the 25% tax bracket, the ¥2,000/month deduction saves ¥6,000/year per child. At the 35% bracket, savings reach ¥8,400/year. For families with twins or multiple children under 3, the deduction applies per child.\n\nThe deduction covers children from birth to the day before their 3rd birthday. After age 3, the children's education deduction (¥1,000/month) takes over, so there is continuous coverage from birth through education.\n\nClaiming this deduction requires the child's birth certificate or medical records. For children born outside China, a translated and authenticated birth certificate is needed. The deduction can be applied through monthly withholding by the employer or claimed during annual tax reconciliation.",
    eligibilityEn: [
      "Subject to Chinese Individual Income Tax",
      "Have a child under 3 years of age",
      "Child's birth certificate or equivalent documentation",
      "Declare child information during tax filing",
    ],
    amount: "¥2,000/month per child (saves up to ¥8,400/year in tax)",
    source: "State Taxation Administration",
    sourceUrl: "https://www.chinatax.gov.cn",
    city: "National",
    updatedAt: "2026-01-12",
  },
  {
    id: "continuing-education-deduction",
    titleEn: "Continuing Education Tax Deduction",
    titleZh: "继续教育专项附加扣除",
    category: "education",
    summaryEn:
      "Foreign nationals pursuing further education or professional certifications in China can deduct ¥400/month or ¥3,600/year from their taxable income for continuing education expenses.",
    detailEn:
      "The continuing education special additional deduction (继续教育专项附加扣除) supports taxpayers who are pursuing additional academic degrees or professional certifications. There are two types of qualifying education.\n\nFor degree-based continuing education (master's, doctoral, or second bachelor's degree), the deduction is ¥400/month for a maximum of 48 months. This applies to programs at recognized Chinese or foreign institutions, as long as the taxpayer is subject to Chinese IIT during the study period.\n\nFor professional certification continuing education, the deduction is ¥3,600/year upon obtaining a qualifying certificate. Recognized certificates include those on the National Vocational Qualification Catalog, which covers fields such as accounting, law, engineering, healthcare, and IT. Foreign professional certificates may qualify if they are recognized by Chinese authorities.\n\nThis deduction is particularly useful for foreign professionals pursuing MBA or other advanced degrees at Chinese universities, or obtaining Chinese professional certifications such as the CPA, legal qualification, or Chinese language proficiency certificates. The deduction can be combined with other special additional deductions for maximum tax savings.",
    eligibilityEn: [
      "Subject to Chinese Individual Income Tax",
      "Enrolled in a qualifying degree program, OR",
      "Obtained a qualifying professional certification during the tax year",
      "Education or certification is from a recognized institution",
    ],
    amount: "¥400/month (degree) or ¥3,600/year (certification)",
    source: "State Taxation Administration",
    sourceUrl: "https://www.chinatax.gov.cn",
    city: "National",
    updatedAt: "2026-02-08",
  },
  {
    id: "shanghai-lingang-special-policy",
    titleEn: "Shanghai Lingang New Area Special Talent Policy",
    titleZh: "上海临港新片区特殊人才政策",
    category: "housing",
    summaryEn:
      "The Lingang New Area in Shanghai offers exceptional benefits for foreign talent including a 50% personal income tax subsidy, priority housing, and streamlined permanent residence applications.",
    detailEn:
      "The Lingang New Area (临港新片区), established in 2019 as part of the Shanghai Free Trade Zone, offers some of China's most aggressive talent attraction policies. These benefits are designed to attract international professionals to this rapidly developing area.\n\nThe most significant benefit is the personal income tax subsidy. Qualified foreign talent working in Lingang can receive a subsidy covering the difference between their actual IIT rate and 15% of their taxable income. For high earners in the 35-45% tax brackets, this effectively reduces their tax rate to 15%, resulting in savings of ¥50,000-¥200,000+ per year.\n\nHousing benefits include priority access to talent apartments at 40-60% below market rate, with monthly subsidies of ¥2,000-¥5,000 depending on talent classification. First-time home buyers among qualified talent can receive a subsidy of ¥300,000-¥600,000 toward property purchase.\n\nLingang also offers a fast-track permanent residence application process, with processing times as short as 3 months (compared to the standard 6+ months). Foreign talent in key industries can apply for permanent residence after just 3 years of working in Lingang, compared to the standard 5-year requirement.",
    eligibilityEn: [
      "Work in the Lingang New Area for a registered company",
      "Employed in a key industry (integrated circuits, AI, biomedicine, aerospace, etc.)",
      "Meet income or qualification thresholds for talent classification",
      "Valid work permit and residence permit",
    ],
    amount: "IIT subsidy reducing effective tax rate to 15% + housing subsidies",
    source: "Lingang New Area Administration",
    sourceUrl: "https://www.lingang.gov.cn",
    city: "Shanghai - Lingang New Area",
    updatedAt: "2026-03-20",
  },
  {
    id: "hainan-free-trade-port-tax",
    titleEn: "Hainan Free Trade Port Tax Benefits",
    titleZh: "海南自由贸易港税收优惠",
    category: "tax",
    summaryEn:
      "The Hainan Free Trade Port offers a 15% cap on personal income tax for high-end talent, zero tariffs on most imported goods, and reduced corporate tax rates for qualifying businesses.",
    detailEn:
      "The Hainan Free Trade Port (海南自由贸易港), established under the 2020 Master Plan, offers some of the most favorable tax policies in China. These benefits are available to both domestic and foreign talent meeting the qualifying criteria.\n\nThe headline benefit is the 15% personal income tax cap for high-end and urgently needed talent. Similar to Lingang, qualified individuals receive a subsidy covering the difference between their actual IIT and 15% of taxable income. This applies to employment income, business income, and subsidies received for talent recognition.\n\nThe Free Trade Port also features zero tariffs on most imported goods (with a negative list for exceptions), making imported consumer goods, vehicles, and yachts significantly cheaper than in the rest of China. The corporate income tax rate for qualifying enterprises is reduced to 15% (from the standard 25%).\n\nFor foreign nationals, Hainan offers relaxed visa policies including visa-free entry for 59 countries, 30-day visa-free stays for tourism/commerce, and simplified work permit procedures. The island is positioning itself as an international hub for tourism, modern services, and high-tech industries.\n\nTo qualify for the 15% IIT cap, individuals must be on the Hainan High-end Talent List and work in Hainan for at least 6 months per year. The application is processed through the Hainan Talent Development Bureau.",
    eligibilityEn: [
      "Classified as high-end or urgently needed talent in Hainan",
      "Work in Hainan for at least 6 months per year",
      "Employed in a qualifying industry",
      "Valid work permit and residence permit",
    ],
    amount: "IIT capped at 15% (savings of ¥30,000-¥200,000+/year)",
    source: "Hainan Free Trade Port Administration",
    sourceUrl: "https://www.hnftp.gov.cn",
    city: "Hainan Province",
    updatedAt: "2026-02-28",
  },
  {
    id: "foreign-driver-license-conversion",
    titleEn: "Foreign Driver's License Conversion",
    titleZh: "境外驾驶证换领中国驾驶证",
    category: "transportation",
    summaryEn:
      "Foreign nationals can convert their home country driver's license to a Chinese license by passing a written theory test, without needing to attend driving school or take a road test.",
    detailEn:
      "Foreign nationals holding a valid driver's license from their home country can convert it to a Chinese driver's license through a simplified process. This is one of the most practical benefits for expats planning to drive in China.\n\nThe conversion process requires only passing a written theory test (Subject 1), which consists of 100 multiple-choice questions. You need to answer at least 90 correctly to pass. The test is available in multiple languages including English, and study materials and practice apps are widely available. No driving school attendance or road test is required.\n\nRequired documents include your original foreign driver's license (with a certified Chinese translation), passport, residence permit, health examination certificate from a designated hospital, and several passport photos. The entire process typically takes 1-2 weeks and costs approximately ¥100-200 in fees.\n\nThe converted Chinese license is valid for 6 years (first issuance), after which it can be renewed for 10-year and then long-term periods. Some countries have reciprocal agreements with China that may further simplify the process. Note that international driving permits (IDPs) are not recognized in China — you must obtain a Chinese license to drive legally.",
    eligibilityEn: [
      "Hold a valid foreign driver's license",
      "Have a valid Chinese residence permit",
      "Pass the written theory test (available in English)",
      "Complete a health examination at a designated hospital",
    ],
    amount: "¥100-200 in processing fees",
    source: "Traffic Management Bureau, Ministry of Public Security",
    sourceUrl: "https://www.mps.gov.cn",
    city: "National",
    updatedAt: "2026-01-22",
  },
  {
    id: "cross-border-remittance-facilitation",
    titleEn: "Cross-Border Remittance Facilitation for Expats",
    titleZh: "外籍人士跨境汇款便利化",
    category: "tax",
    summaryEn:
      "Foreign employees in China can legally remit their after-tax income abroad through simplified procedures, with banks offering expedited processing for qualified foreign talent.",
    detailEn:
      "China allows foreign nationals to remit their legitimate after-tax income abroad. The State Administration of Foreign Exchange (SAFE) has simplified procedures for foreign employees, particularly those classified as high-end talent.\n\nFor regular foreign employees, you can remit your after-tax salary by providing your employment contract, tax payment certificates, and salary records to your bank. The annual remittance limit is generally your after-tax annual income, and each transaction requires supporting documentation.\n\nHigh-end foreign talent (R-visa holders and those on talent lists) enjoy expedited processing with reduced documentation requirements. Some banks have dedicated foreign talent service windows that can process remittances within 1-2 business days instead of the standard 3-5 days.\n\nMajor banks such as Bank of China, ICBC, and HSBC offer bilingual services and online remittance platforms. The Bank of China's 'Easy Remittance' service for foreign talent allows online submission of documents and tracking of remittance status. Exchange rates are generally competitive, and fees range from ¥50-¥200 per transaction depending on the amount and destination.\n\nIt is important to note that all remittances must be from legitimately earned and taxed income. Attempting to remit untaxed income or amounts exceeding your declared income can result in penalties and difficulties with future transactions.",
    eligibilityEn: [
      "Valid work permit and residence permit",
      "After-tax income from legitimate employment",
      "Tax payment certificates for the remittance period",
      "Bank account at a qualified foreign exchange bank",
    ],
    amount: "Up to 100% of after-tax income annually",
    source: "State Administration of Foreign Exchange",
    sourceUrl: "https://www.safe.gov.cn",
    city: "National",
    updatedAt: "2026-03-08",
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Policy id is required" });
    return;
  }

  const policy = policies.find((p) => p.id === id);
  if (!policy) {
    res.status(404).json({ error: "Policy not found" });
    return;
  }

  // 返回完整信息（全部免费）
  const categoryLabel = policyCategories[policy.category] ?? policy.category;
  res.status(200).json({
    id: policy.id,
    titleEn: policy.titleEn,
    category: categoryLabel,
    summaryEn: policy.summaryEn,
    city: policy.city,
    updatedAt: policy.updatedAt,
    pro: true,
    detailEn: policy.detailEn,
    eligibilityEn: policy.eligibilityEn,
    amount: policy.amount,
    source: policy.source,
    sourceUrl: policy.sourceUrl,
  });
}
