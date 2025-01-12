import { Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 items-center content-center py-12">
      <div className="flex gap-3">
        <Link
          href="https://github.com/fzinnah17/columbia-devfest24"
          target="_blank"
        >
          <Github />
        </Link>
      </div>
      <div>
        <small className="pt-3 md:pt-4">
          Designed and built by{" "}
          <Link
            href="https://github.com/fzinnah17/columbia-devfest24"
            target="_blank"
            className="font-semibold"
          >
            CU Hackathon Team
          </Link>
        </small>
      </div>
      <div>
        <small className="pt-3 md:pt-4">
          Updated by{" "}
          <Link
            href="https://github.com/vangarde03"
            target="_blank"
            className="font-semibold"
          >
            vangarde03
          </Link>
        </small>
      </div>
      <p className="footer-bottom-text">© 2024 DevFest</p>
    </footer>
  );
}
