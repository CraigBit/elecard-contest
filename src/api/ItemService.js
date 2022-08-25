export default class ItemService {
  static async getAll() {
    const response = await fetch(
      'http://contest.elecard.ru/frontend_data/catalog.json'
    );
    const json = await response.json();
    return json;
  }
}
