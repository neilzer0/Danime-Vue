<template>
  <div v-if="!load"><Load /></div>
  <div v-if="load" class="anime container-xl">
    <Navbar />
    <div class="d-flex justify-content-center px-3">
      <div class="fondo col-12 rounded">
        <div class="rounded text-white opacity2 row d-flex">
          <div class="col-12 rounded p-5">
            <div
              class="
                d-flex
                justify-content-between
                align-items-center
                flex-column
              "
            >
              <h2>Terms and Conditions of Use</h2>

              <h4>RELEVANT INFORMATION</h4>
              <p>
                It is a necessary requirement for the acquisition of the
                products that offered on this site, that you read and accept the
                following Terms and Conditions that are written below. The use
                of our services as well as the purchase of our products will
                imply that you have read and accepted the Terms and Conditions
                of Use in this document. All products that are offered by our
                website could be created, collected, sent or presented by a
                third-party website and in such case would be subject to their
                own Terms and Conditions. In some cases, to purchase a product,
                you will need the registration by the user, with input of
                personal data trustworthy and definition of a password. The user
                can choose and change the password for your administration
                access account at any time, in case you have registered and that
                is necessary for the purchase of any of our products. Danime.com
                does not assume responsibility in the event that give this key
                to third parties. All purchases and transactions carried out
                through this website, are subject to a confirmation and
                verification process, the which could include verification of
                stock and availability of product, validation of the payment
                method, validation of the invoice (if any) and compliance with
                the conditions required by the selected payment method. On some
                cases may require verification through of e-mail. The prices of
                the products offered in This Online Store is valid only for
                purchases made on this website.
              </p>

              <h4>LICENSE</h4>
              <p>
                Danime.com through its website grants a license to that users
                use the products that are sold in this website according to the
                Terms and Conditions that are described in this document.
              </p>
              <h4>UNAUTHORIZED USE</h4>
              <p>
                If applicable (for the sale of software, templates, or other
                design and programming product) you cannot place one of our
                products, modified or unmodified, on a CD, website or any other
                means and offer them for the redistribution or resale of any
                kind.
              </p>

              <h4>PROPERTY</h4>
              <p>
                You cannot declare intellectual or exclusive property to none of
                our products, modified or unmodified. Everyone The products are
                the property of the content providers. On Unless otherwise
                specified, our products are provided without warranty of any
                kind, express or implicit. In no case will this company be
                responsible for any damage including, but not limited to,
                direct, indirect, special, incidental or consequential or other
                losses resulting from the use or inability to use our products.
              </p>
              <h4>REFUND AND GUARANTEE POLICY</h4>
              <p>
                In the case of products that are irrevocable merchandise
                non-tangible, we do not issue refunds after it is shipped the
                product, you have the responsibility to understand before buy.
                We ask that you read carefully before purchasing. We only make
                exceptions to this rule when the description does not fit the
                product. There are some products that could have a guarantee and
                possibility of reimbursement but this will be specified when
                purchasing the product. In such cases the warranty will only
                cover factory faults and will only be effective when the product
                has been used correctly. The guarantee does not covers
                breakdowns or damage caused by improper use. The terms warranty
                are associated with manufacturing faults and operation under
                normal conditions of the products and only These terms will be
                effective if the equipment has been used correctly. This
                includes: - According to specifications techniques indicated for
                each product. - In conditions according to the specifications
                indicated by the maker. - In specific use for the function with
                which it was factory designed. - In electrical operating
                conditions according to the specifications and tolerances
                indicated.
              </p>
              <h4>ANTI-FRAUD CHECK</h4>
              <p>
                Customer purchase may be postponed for checking anti fraud. It
                can also be suspended for a longer time for a more rigorous
                investigation, to avoid transactions fraudulent.
              </p>
              <h4>PRIVACY</h4>
              <p>
                This Danime.com guarantees that valencia cf news personal
                information you submit has the security necessary. The data
                entered by user or in the case of require a validation of orders
                will not be delivered to third parties, unless it must be
                disclosed in compliance with a court order or legal
                requirements. Subscription to advertising email newsletters is
                voluntary and could be selected when creating your account.
                Danime.com reserves the rights to change or modify these terms
                without notice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";

import Load from "@/components/Load.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  mounted() {
    setTimeout(() => {
      this.load = true;
    }, 2000);
  },
  data() {
    return {
      load: false,
    };
  },
  components: { Footer, Navbar, Load },
};
</script>
<style scoped>
.fondo {
  background-image: url("../assets/images/background.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.opacity2 {
  background-color: rgba(33, 37, 41, 0.7);
}
</style>