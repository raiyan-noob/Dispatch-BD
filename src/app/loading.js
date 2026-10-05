export default function Loading() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading">
      <div className="loading-spinner" aria-hidden="true" />
      <p>Loading...</p>
    </div>
  );
}
