class Book{
    constructor(title, price) {
        this.title = title;
        this.cost = price; //price is parameter but cost is a property
    }
    borrow(){
        console.log(`${this.title} is borrowed`);
    }
    static rent(){
        //this.borrow();
        console.log(this.title); //wont work
    }
}

class FictionBook extends Book{
    borrow() {
        console.log('override');
    }
}

const b1 = new Book("Learn HTML", 100);
console.log(b1.cost);
b1.rent();
const fb = new FictionBook('Caves of Steel', 101);
console.log(fb.title);
fb.borrow;