export default class FetchService {
    async getResource(url) {
      const res = await fetch(url);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
      }
  
      return await res.json();
    };
  
    async getAllObjects(size) {
      if (size === 1000) {
        const res = await this.getResource('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
        return res;
      } else {
        const res = await this.getResource('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
        return res;
      }
    }

    async getPerson(number) {
      const res = await this.getResource('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
      return res[number];
    }
  }