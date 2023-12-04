package apollov2.com.entity;

import apollov2.com.entity.enums.CoffeeSizes;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coffee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long coffeeId;
    private String name;
    private String description;
    private String image;
    private Double price;
    private BigInteger stock;

    @Enumerated(EnumType.STRING)
    private CoffeeSizes size;

    @OneToMany(mappedBy = "coffee")
    private Set<OrderDetail> orderDetails = new HashSet<>();

}

