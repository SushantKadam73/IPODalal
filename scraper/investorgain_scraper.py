import asyncio
import csv
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright

async def scrape_investorgain():
    url = "https://www.investorgain.com/report/live-ipo-gmp/331/all/"
    base_dir = Path(__file__).resolve().parent
    output_dir = base_dir / "output_scraper"
    output_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context()
        page = await ctx.new_page()
        await page.goto(url, wait_until="networkidle")

        table_selector = "#report_table"
        await page.wait_for_selector(table_selector)
        table = await page.query_selector(table_selector)
        headers = await table.query_selector_all("thead tr th")
        header_names = [await h.inner_text() for h in headers]
        header_names.insert(1, "Company Link")

        rows = await table.query_selector_all("tbody tr")
        data = []
        for row in rows:
            cells = await row.query_selector_all("td")
            cell_texts = [await cell.inner_text() for cell in cells]
            link_el = await cells[0].query_selector("a")
            link = None
            if link_el:
                href = await link_el.get_attribute("href")
                link = urljoin("https://www.investorgain.com", href)
            row_data = [cell_texts[0], link] + cell_texts[1:]
            data.append(row_data)

        csv_path = output_dir / "investorgain.csv"
        with csv_path.open("w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(header_names)
            writer.writerows(data)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(scrape_investorgain())
