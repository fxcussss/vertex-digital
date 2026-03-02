import AdminLoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login — Vertex Digital",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#030303" }}
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(16,185,129,0.15) 0%, transparent 60%)",
        }}
      />
      <AdminLoginForm />
    </main>
  );
}
