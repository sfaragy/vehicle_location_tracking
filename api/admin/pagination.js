class Pagination{

    constructor(totalCount,currentPage,pageUri,perPage=2){
        this.perPage = perPage;
        this.totalCount =parseInt(totalCount);
        this.currentPage = parseInt(currentPage);
        this.previousPage = this.currentPage - 1;
        this.nextPage = this.currentPage + 1;
        this.pageCount = Math.ceil(this.totalCount / this.perPage);
        this.pageUri = pageUri;
        this.offset  = this.currentPage > 1 ? this.previousPage * this.perPage : 0;
        this.sidePages = 4;
        this.pages = false;
    }
    
    
    
    links(){
        this.pages='<nav aria-label="Page navigation example"> <ul class="inline-flex -space-x-px">';
    
        if(this.previousPage > 0)
            this.pages+='<li><a class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="'+this.pageUri + this.previousPage+'">Previous</a></li>';
    
    
            /*Add back links*/
            if(this.currentPage > 1){
                for (var x = this.currentPage - this.sidePages; x < this.currentPage; x++) {
                    if(x > 0)
                        this.pages+='<li><a class="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" href="'+this.pageUri+x+'">'+x+'</a></li>';
                }
            }
    
            /*Show current page*/
            this.pages+='<li><a class="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" href="'+this.pageUri+this.currentPage+'">'+this.currentPage+'</a></li>';
    
            /*Add more links*/
            for(x = this.nextPage; x <= this.pageCount; x++){
    
                this.pages+='<li><a class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="'+this.pageUri+x+'">'+x+' </a></li>';
    
                if(x >= this.currentPage + this.sidePages)
                    break;
            }
    
    
            /*Display next buttton navigation*/
            if(this.currentPage + 1 <= this.pageCount)
                this.pages+='<li><a class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"href="'+this.pageUri+this.nextPage+'">Next</a></li>';
    
            this.pages+='</nav>  </ul>';
    
        return this.pages;
    }
}
    module.exports = Pagination;