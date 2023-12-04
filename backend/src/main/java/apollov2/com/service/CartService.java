package apollov2.com.service;

import apollov2.com.entity.Cart;
import apollov2.com.entity.CartDTO;
import apollov2.com.entity.CartItem;
import apollov2.com.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public Cart getCart() {
        return cartRepository.findById(1L).orElseThrow();
    }
    public CartDTO getCartDTO() {
        Cart myCart = cartRepository.findById(1L).orElseThrow();
        CartDTO cartDTO = CartDTO.builder().cartId(myCart.getCartId()).build();
        double total = 0;
        for (CartItem tmpCartItem: myCart.getItems()) {
            cartDTO.getItems().add(tmpCartItem);
            total += tmpCartItem.getQuantity()*tmpCartItem.getCoffee().getPrice();

        }
        cartDTO.setTotal(total);
        return cartDTO;

    }

    public void save(Cart myCart) { cartRepository.save(myCart);}
}
