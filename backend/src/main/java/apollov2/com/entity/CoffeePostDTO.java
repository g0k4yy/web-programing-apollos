package apollov2.com.entity;

import apollov2.com.entity.enums.CoffeeSizes;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CoffeePostDTO {
    private String name;
    private String description;
    private String image;
    private Double price;
    private BigInteger stock;

    @Enumerated(EnumType.STRING)
    private CoffeeSizes size;
}
