const bask = new Vue({
    el: '#bask',
    data: {
        products: [],
        bask: [],
        cartItem: [],
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
        removeProduct(product) {
            this.getJson(`deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1){
                        if (product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.bask.splice(this.bask.indexOf(product),1);
                        }
                    }
                })
        },
    },

    mounted(){
        this.getJson(`getBaskets.json`)
            .then(data => {
                for(let el of data){
                    this.bask.push(el);
                }
            });
    }
});

