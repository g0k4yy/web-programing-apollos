package apollov2.com.entity;


import apollov2.com.entity.enums.CoffeeSizes;
import lombok.*;

import java.math.BigInteger;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CoffeeGetDTO {
    private Long coffeeId;
    private String name;
    private String description;
    private String image;
    private Double price;
    private BigInteger stock;
    private CoffeeSizes size;
}
