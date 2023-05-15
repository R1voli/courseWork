const cat = new Vue({
    el: '#cat',
    data: {
        products: [],
        catal: [],
        cartItem: [],
        userSearch: '',
        show: false
    },

    methods:{
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            this.getJson(`addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItem.find(el => el.id_product === product.id_product);
                        if (find){
                            find.quantity++;
                        } else {
                            const prod = Object.assign({quantity: 1}, product);
                            this.cartItem.push(prod);
                        }
                    }
                })
        },
        removeProduct(product) {
            this.getJson(`deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1){
                        if (product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.cartItem.splice(this.cartItem.indexOf(product),1);
                        }
                    }
                })
        },
    },

    mounted(){
        this.getJson(`getCatalog.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.catal.push(el);
                }
            });
    }
});