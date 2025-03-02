import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface User {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  hair: { color: string };
  company: { department: string };
  address: { postalCode: string };
}

const summarizeByDepartment = (users: any[]) => {
  return users.reduce((acc, user) => {
    const department = user.company.department;

    if (!acc[department]) {
      acc[department] = {
        male: 0,
        female: 0,
        ageRange: { min: Infinity, max: -Infinity },
        hair: {},
        addressUser: {}
      };
    }

    const dept = acc[department];

    dept[user.gender]++;

    dept.ageRange.min = Math.min(dept.ageRange.min, user.age);
    dept.ageRange.max = Math.max(dept.ageRange.max, user.age);

    dept.hair[user.hair.color] = (dept.hair[user.hair.color] || 0) + 1;

    const fullName = `${user.firstName}${user.lastName}`;
    dept.addressUser[fullName] = user.address.postalCode;

    return acc;
  }, {});
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'GET') {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const data: User[] = response.data?.users || [];

      if (!Array.isArray(data)) {
        throw new Error('API response is not an array.');
      }

      const result = summarizeByDepartment(data);

      Object.values(result).forEach((dept: any) => {
        dept.ageRange = `${dept.ageRange.min}-${dept.ageRange.max}`;
      });
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch or process data' });
    }
  } 
}
