package apollov2.com.controller;

import apollov2.com.entity.Cart;
import apollov2.com.entity.CartDTO;
import apollov2.com.entity.CartItem;
import apollov2.com.entity.Coffee;
import apollov2.com.repository.CartItemRepository;
import apollov2.com.service.CartService;
import apollov2.com.service.CoffeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final CoffeeService coffeeService;
    private final CartItemRepository cartItemRepository;

    @GetMapping
    public CartDTO getCart() {
        return cartService.getCartDTO();
    }

    @PostMapping
    public boolean updateCart(@RequestParam Long coffeeId, @RequestParam int quantity) {

        Cart myCart = cartService.getCart();
        Coffee coffee = coffeeService.findCoffeeById(coffeeId);

        // Check if the coffee already exists in the cart
        boolean coffeeExists = false;
        for (CartItem item : myCart.getItems()) {
            if (item.getCoffee().getCoffeeId().equals(coffeeId)) {
                // Coffee exists, update the quantity
                item.setQuantity(quantity);
                coffeeExists = true;
                break;
            }
        }

        // If coffee does not exist in the cart, add as a new item
        if (!coffeeExists) {
            CartItem newCartItem = CartItem.builder()
                    .coffee(coffee)
                    .quantity(quantity)
                    .cart(myCart)
                    .build();
            myCart.getItems().add(newCartItem);
        }

        cartService.save(myCart);
        return true;
    }
    @PostMapping("/remove")
    public boolean removeFromCart(@RequestParam Long coffeeId) {
        Cart myCart = cartService.getCart();

        CartItem itemToRemove = null;
        for (CartItem item : myCart.getItems()) {
            if (item.getCoffee().getCoffeeId().equals(coffeeId)) {
                itemToRemove = item;
                break;
            }
        }

        if (itemToRemove != null) {
            myCart.getItems().remove(itemToRemove);
            cartService.save(myCart);
            return true;
        } else {
            return false;
        }
    }



}
