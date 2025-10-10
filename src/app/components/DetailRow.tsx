export function DetailRow({ label, value }: { label: string; value: string | number }) {
    return (
      <p>
        <strong>{label}:</strong> {value}
      </p>
    );
  }
  