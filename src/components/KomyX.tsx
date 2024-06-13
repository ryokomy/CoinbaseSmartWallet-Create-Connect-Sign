import Link from "next/link";

export function KomyX() {
  return (
    <div style={{ textAlign: "center" }}>
      created by
      <Link href="https://x.com/ryoheikomy">
        <span style={{ marginLeft: "8px" }}>Komy | Kyuzan</span>
      </Link>
    </div>
  );
}
