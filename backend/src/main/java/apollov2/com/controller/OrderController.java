package apollov2.com.controller;

import apollov2.com.entity.Cart;
import apollov2.com.entity.CartItem;
import apollov2.com.entity.Order;
import apollov2.com.entity.OrderDetail;
import apollov2.com.repository.CartRepository;
import apollov2.com.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    @PostMapping
    public ResponseEntity<Order> createOrder() {
        Cart cart = cartRepository.findById(1L).orElseThrow();
        Order order = new Order();
        order.setOrderDate(new java.util.Date());

        for(CartItem cartItem : cart.getItems())
        {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setCoffee(cartItem.getCoffee());
            orderDetail.setQuantity(cartItem.getQuantity());
            orderDetail.setSubtotal((cartItem.getCoffee().getPrice()*cartItem.getQuantity()));
            order.getOrderDetails().add(orderDetail);

        }
        double total = 0;
        for(OrderDetail orderDetail : order.getOrderDetails()) {
            total += orderDetail.getSubtotal();

        }
        order.setTotalAmount(total);
        orderRepository.save(order);
        cart.getItems().clear();
        cartRepository.save(cart);

        return ResponseEntity.ok(order);

    }

    @GetMapping
    public ResponseEntity<List<Order>> getLastTenOrders() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("orderDate").descending());
        List<Order> orders = orderRepository.findAll(pageable).getContent();
        return ResponseEntity.ok(orders);
    }

}
