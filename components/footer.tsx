import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} IPO Dalal. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/SushantKadam73/IPODalal"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://x.com/Sushant_Kadam73"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:underline">
              Documentation
            </Link>
            <Link href="/docs/changelog" className="hover:underline">
              v0.0.3
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

