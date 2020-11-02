export class PaginationList {
	currentPage: number
	data: Array<any>
	size: number

	constructor(other?: any) {
		if (other != null) {
			this.currentPage = other.currentPage;
			this.size = other.size;
			this.data = other.data;
		}

	}

}
