package apollov2.com.entity;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Builder
public class CartDTO {
    private Long cartId;
    @Builder.Default
    private List<CartItem> items = new ArrayList<>();
    private double total;
}
