const COMPLAINTS_KEY = 'storeComplaints';

export const saveComplaint = (complaint) => {
  const complaints = getComplaints();
  const entry = {
    id: Date.now(),
    status: 'registered',
    createdAt: new Date().toISOString(),
    ...complaint,
  };
  complaints.push(entry);
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
  return entry;
};

export const getComplaints = () => {
  const data = localStorage.getItem(COMPLAINTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getComplaintsByEmail = (email) => {
  return getComplaints().filter(
    (c) => c.email?.toLowerCase() === email.toLowerCase()
  );
};
