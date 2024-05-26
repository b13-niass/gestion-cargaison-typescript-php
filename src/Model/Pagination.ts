export class Pagination<T> {
  private items: T[];
  private currentPage: number;
  private itemsPerPage: number;

  constructor(items: T[], itemsPerPage: number) {
    this.items = items;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
  }

  setItems(items: T[]) {
    this.items = items;
  }

  getItemsPerPage(): number {
    return this.itemsPerPage;
  }

  getNbrItems():number{
    return this.items.length;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getTotalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  getPageItems(page: number = this.currentPage): T[] {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.goToPage(page)
    return this.items.slice(start, end);
  }

  startPage():number{
    return (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
  }

  endPage():number{
    return (this.currentPage * this.itemsPerPage);
  }

  nextPage(): number {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage = ++this.currentPage;
    }else {
      this.currentPage = this.getTotalPages();
    }
    return this.currentPage;
  }

  previousPage(): number {
    if (this.currentPage > 1) {
      this.currentPage = --this.currentPage;
    }else {
      this.currentPage = 1;
    }
    return this.currentPage;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }
  makeFooter(): void {
    const currentPage = this.getCurrentPage();
    const itemsPerPage = this.getItemsPerPage();
    const totalItems = this.getNbrItems();
    const totalPages = this.getTotalPages();
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    const paginationBar = document.getElementById("paginationBar") as HTMLDivElement;
    paginationBar.innerHTML = '';
    let template = `
        <span class="text-sm text-gray-600">Afficher ${this.startPage()} à ${this.endPage()} de ${this.items.length} cargaisons</span>
        <div id="paginationNav" class="flex space-x-1">
            <button data-paginate="${this.previousPage()}" class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Précédent</button>`;
           for(let i = 1; i <= this.getTotalPages(); i++) {
             template += `<button data-paginate="${i}" class = "px-3 py-1 ${i == currentPage ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700" } rounded hover:bg-blue-600" > ${i} </button>`;
           }

     template +=`<button data-paginate="${nextPage}" class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Suivant</button>
              </div>`;
       paginationBar.innerHTML = template;
  }
}
