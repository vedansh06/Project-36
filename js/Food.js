class Food {

    constructor(){
        this.image = loadImage("Milk.png");
        this.foodStock = 0;
        this.lastFed;`` 
    }

    getFoodStock(){
    return this.foodStock;    
    }

    updateFoodStock(foodStock){
    this.foodStock = foodStock
    }

    deductFoodStock(){
      if(this.foodStock > 0){
          this.foodStock = this.foodStock - 1;
      }  
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    bedroom(){
        background(bedroomImg);
    }
    garden(){
        background(gardenImg);
    } 
    washroom(){
        background(washroomImg);
    }

    display(){
        var x = 8;
        var y = 100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);  

        if(this.foodStock != 0){
            for(var i = 0;i<this.foodStock;i++){
                if(i%10 == 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
}