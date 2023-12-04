package apollov2.com;

import apollov2.com.entity.Coffee;
import apollov2.com.entity.enums.CoffeeSizes;
import apollov2.com.repository.CoffeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import apollov2.com.entity.Cart;
import apollov2.com.repository.CartRepository;

import java.math.BigInteger;

@Component
public class AppStartupRunner implements CommandLineRunner {

    private final CartRepository cartRepository;
    private final CoffeeRepository coffeeRepository;

    public AppStartupRunner(CartRepository cartRepository,CoffeeRepository coffeeRepository) {
        this.cartRepository = cartRepository;
        this.coffeeRepository = coffeeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Coffee coffee1 = new Coffee();
        coffee1.setName("Espresso");
        coffee1.setDescription("A classic espresso shot");
        coffee1.setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Espresso_shot.jpg/800px-Espresso_shot.jpg?20210215183555");
        coffee1.setPrice(3.99);
        coffee1.setStock(BigInteger.valueOf(100));
        coffee1.setSize(CoffeeSizes.SMALL);

        Coffee coffee2 = new Coffee();
        coffee2.setName("Cappuccino");
        coffee2.setDescription("Creamy cappuccino with foam");
        coffee2.setImage("https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg");
        coffee2.setPrice(4.99);
        coffee2.setStock(BigInteger.valueOf(120));
        coffee2.setSize(CoffeeSizes.MEDIUM);

        Coffee coffee3 = new Coffee();
        coffee3.setName("Latte");
        coffee3.setDescription("Smooth and frothy latte");
        coffee3.setImage("https://upload.wikimedia.org/wikipedia/commons/f/f9/Caffe_Latte.jpg");
        coffee3.setPrice(5.49);
        coffee3.setStock(BigInteger.valueOf(80));
        coffee3.setSize(CoffeeSizes.LARGE);

        Coffee coffee4 = new Coffee();
        coffee4.setName("Mocha");
        coffee4.setDescription("Rich and chocolaty mocha");
        coffee4.setImage("https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/the_perfect_mocha_coffee_29100_16x9.jpg");
        coffee4.setPrice(5.99);
        coffee4.setStock(BigInteger.valueOf(90));
        coffee4.setSize(CoffeeSizes.SMALL);

        coffeeRepository.save(coffee1);
        coffeeRepository.save(coffee2);
        coffeeRepository.save(coffee3);
        coffeeRepository.save(coffee4);


        Cart newCart = new Cart();
        cartRepository.save(newCart);
    }
}
