const DonorDashboard = () => {
  const src = (import.meta.env.VITE_DONOR_DASHBOARD_URL as string | undefined) ?? "http://localhost:5174";

  return (
    <div className="min-h-screen w-full bg-background">
      <iframe
        title="Donor Dashboard"
        src={src}
        className="w-full h-screen border-0"
        allow="clipboard-read; clipboard-write; fullscreen;"
      />
    </div>
  );
};

export default DonorDashboard;


