import requests
import csv

def get_data():
    r = requests.get("http://www.nasdaq.com/quotes/nasdaq-100-stocks.aspx?render=download")
    data = r.text
    fieldnames = ("Symbol", "Name", "lastsale", "netchange", "pctchange", "share_volume", "Nasdaq100_points")
    reader = csv.DictReader(data.splitlines(), fieldnames=fieldnames)
    reader.next()
    result = {"children": []}
    for line in reader:
        if float(line["Nasdaq100_points"]) > .01:
            result["children"].append({
                "name": line["Name"].strip(),
                "symbol": line["Symbol"].strip(),
                "price": line["lastsale"].strip(),
                "netchange": line["netchange"].strip(),
                "pctchange": line["pctchange"].strip(),
                "volume": line["share_volume"].strip(),
                "value": line["Nasdaq100_points"].strip()
            })
    return result

if __name__ == "__main__":
    get_data()