import asyncio
import csv
from pathlib import Path
from playwright.async_api import async_playwright

async def scrape_nse():
    url = "https://www.nseindia.com/market-data/all-upcoming-issues-ipo"
    base_dir = Path(__file__).resolve().parent
    output_dir = base_dir / "output_scraper"
    output_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context(
            ignore_https_errors=True,
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.187 Safari/537.36"
        )
        page = await ctx.new_page()
        # navigate with retry on protocol errors
        try:
            await page.goto(url, wait_until="networkidle", timeout=60000)
        except Exception:
            await page.goto(url, wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_load_state("networkidle")
        # additional wait for JS-rendered content
        await page.wait_for_timeout(5000)

        tabs = {
            "current": {"button": "#Ipo_current", "table": "#publicIssuesCurrent"},
            "upcoming": {"button": "#ipo_upcomingIssue", "table": "#upcomingIpoTable"},
            "past": {"button": "#ipo_pastissue", "table": "#publicIssuePastTable"},
        }
        for name, info in tabs.items():
            if name != "current":
                await page.click(info["button"])
                await page.click("#refresh")
            await page.wait_for_selector(info["table"], timeout=60000)
            table = await page.query_selector(info["table"])
            headers = await table.query_selector_all("thead tr th")
            header_names = [await h.inner_text() for h in headers]
            rows = await table.query_selector_all("tbody tr")
            data = []
            for row in rows:
                cells = await row.query_selector_all("td")
                data.append([await cell.inner_text() for cell in cells])
            csv_path = output_dir / f"nse_{name}.csv"
            with csv_path.open("w", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                writer.writerow(header_names)
                writer.writerows(data)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(scrape_nse())
