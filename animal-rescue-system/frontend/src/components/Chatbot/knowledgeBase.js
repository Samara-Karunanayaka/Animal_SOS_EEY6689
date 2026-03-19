// Animal Rescue Knowledge Base
export const animalRescueKnowledge = {
  reporting: {
    keywords: ['report', 'stray', 'injured', 'abandoned', 'found', 'rescue'],
    content: `
How to Report an Animal:
1. Take photos of the animal from a safe distance
2. Note the location, time, and condition
3. Call our 24/7 hotline: +94 11 234 1900
4. Or use our online reporting form at /report
5. Provide as much detail as possible about the animal's appearance, behavior, and location
6. If the animal is in immediate danger, contact local authorities first
    `
  },
  adoption: {
    keywords: ['adopt', 'adoption', 'take home', 'foster', 'pet'],
    content: `
Adoption Process:
1. Browse available animals on our adoption page
2. Fill out an adoption application
3. Meet and greet with the animal
4. Home visit to ensure suitability
5. Sign adoption contract
6. Take your new family member home!

Requirements:
- Must be 18+ years old
- Valid ID and proof of address
- References may be required
- Some animals require fenced yards or specific living conditions
    `
  },
  donation: {
    keywords: ['donate', 'donation', 'support', 'help', 'money', 'fund'],
    content: `
Ways to Support Us:
1. Monetary Donations: Visit /donate for one-time or recurring gifts
2. Supplies: We need food, bedding, toys, and medical supplies
3. Volunteering: Help with animal care, events, or administrative tasks
4. Sponsorship: Sponsor a specific animal's care
5. Wish List: Check our Amazon wishlist for needed items

Tax-deductible donations accepted. Every contribution helps save lives!
    `
  },
  volunteering: {
    keywords: ['volunteer', 'help', 'assist', 'time', 'work'],
    content: `
Volunteer Opportunities:
1. Animal Care: Feeding, walking, cleaning
2. Event Support: Adoption events, fundraisers
3. Administrative: Data entry, phone support
4. Foster Care: Provide temporary homes
5. Transportation: Help transport animals

Requirements:
- Complete volunteer application
- Attend orientation session
- Commit to regular schedule
- Background check may be required

Contact: volunteers@animalrescue.lk
    `
  },
  tracking: {
    keywords: ['track', 'status', 'case', 'update', 'progress'],
    content: `
Track Your Case:
1. Go to /track-cases
2. Enter your case number (provided when you reported)
3. View real-time updates on rescue progress
4. Receive notifications via email/SMS
5. Contact us if you have questions about your case

We update cases regularly and aim to resolve them as quickly as possible.
    `
  },
  emergency: {
    keywords: ['emergency', 'urgent', 'danger', 'hurt', 'dying', 'immediate'],
    content: `
Emergency Situations:
If an animal is in immediate danger:
1. Call emergency services: 911
2. Then call our hotline: +1 (234) 567-8900
3. Do not attempt to handle dangerous situations yourself
4. Provide exact location and description

For animal cruelty or abuse:
- Contact local animal control
- Report to authorities
- Document with photos if safe

We work closely with law enforcement for emergency rescues.
    `
  }
};

export const findRelevantKnowledge = (userMessage) => {
  const message = userMessage.toLowerCase();
  const relevantTopics = [];

  for (const [topic, data] of Object.entries(animalRescueKnowledge)) {
    const hasKeyword = data.keywords.some(keyword => message.includes(keyword));
    if (hasKeyword) {
      relevantTopics.push({
        topic,
        content: data.content,
        relevance: data.keywords.filter(k => message.includes(k)).length
      });
    }
  }

  // Sort by relevance and return top matches
  return relevantTopics
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 2)
    .map(item => item.content)
    .join('\n\n');
};