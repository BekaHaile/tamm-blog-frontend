import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBlogs } from "../../services/getBlogs";
import { Blog } from "../../models/blog";
import { Content, Img, Post, PostContainer } from "./home.styles";
import { API_URL, ImgPlaceholder } from "../../constants";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

const PlaceholderPosts: Blog[] = [
  {
    id: "1",
    title: "Placeholder Post 1",
    content: "This is a placeholder description for post 1",
    img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Beka Haile",
    date: "05/05/2023",
    userImg:
      "data:image/jpeg;base64,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",
  },
  {
    id: "2",
    title: "Placeholder Post 2",
    content: "This is a placeholder content for post 2",
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHoA2QMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xABPEAABAwIDBAYECAcNCQAAAAABAgMEABEFEiEGMUFRExQiYXGBMpGhsQcWI0JS0eHwFVRicpPB0jM0NUNEVVZkgpKUo/EXJFNjZXN0osL/xAAbAQACAwEBAQAAAAAAAAAAAAAABQEDBAIGB//EADURAAICAQIDBQYDCQEAAAAAAAABAgMRBCESMUEFExRRYRUiMlJxgTM0sSNCYpGhwdHh8PH/2gAMAwEAAhEDEQA/ANNxrzh64KAD776AD776CMC0EhQQF/GgkSgAoAWgAvQAXoIQUEiUYAWpICgAoAL0AF6ADSoANKkMBeoAL0AF6AwJQSFABQAtSQJUEhQAUAFABQAedAAKACgBfI0AITQAXoAL1AYCjJIlAYDzoAPXQAUAFQAUAFSAUAFABQAUAFABejIBejIC3oIweCqoOgzHhQAZlcqAwgzK7qNw2DMqjcMIMyu710ZYbBmV3UbhsGZVGWGwAnkKA2C6uQoAL0AFzQAXNABc0AJc8qAC6uQ9dAbC5lch66A2EurkKAwguvkKAwguvkPbQTsF18hQRsL2+VG4bB2+VG4bB2uXtoww2C6u6jDDYO13UbhsL2uVG5Gwa8jUgeTvqCQAvQAEWoAKACgAoIFqQCgBKMgF6jIBcUZALjnUgLfvFABpzFAB50ZQC3FGUAX7/bQAXFACX76AFBHL20AAUKAE8vZRkAGvD3UALryoALnv9dACZvH10AGajIHrMaMkbHjjUHQXtQB4debZQXHnEtoA1Uo2FSouTwkcykorLIGG41FxJ9TMfpAUpCgVptnHdr76vt006knIz0auF8nGPQsvL21nNRTu4jMlyHGsJQwGmVFDkl+5SVDelKRvtxNxWuvTx4VKx8+guu1klJxrXLqxBiU6A43+FkMLjOKCBJjgpCCTYZ0kmw4XBNTLTwazD+TIr1s1JK1Lfqi68SKyDENDUE7lY9jTqMaGFMYWh15akpaKpGQLuLjeLCm1ejpnBS8xHbr74WShtsWiou0KQSdm2wAL3OIJqzwNXqce0dR6FB8aVfzQnylfZUeDp9SfH6n0LNErFlpBRs8DfdaZvv5VX4aj1OvGar0/77kiOMblBZjbPtOBCsqsuIJOU8j31b4Gr1OH2hqF5DvU9ov6Mo/x6aPA1eoe0dR6FNMx2VCmOw5OCJQ+0QFp61exIB4DkRUeBq9SPaV/oMHalY9LB0gf+Sfqo8DSHtO/0Iydtmlzo8JOFJU++6htKUSCbFRAGtu+oeipS6krtLUN42NQrLc5bW4UoeM7D5ZxuZbajaf8FykQ44a6bKFrU4kqAvuGlbtLpY2x45chZrdbKmfBDmVLu2MpKIoivJfeynpmzHGqvySlWul+VanoaWYvaV68iS9t2gwOw0GpijYfOSkc/HuqpdnpT3exol2o3XsveG8L2wldKkSyiQ0o6qAAUn1aVZboYOOYbMqp7RsUvf3RuEqSpIUkgg7jSgerfcPMVGSSNiL0qLG6zHhOSW0n5Uo+YLb61afTu7O+MGPVatafCxnI1h+MQp5ysOgO2uWlGyh5fVVdtE6nujujVV3L3Xv5dSwvVWTQeXVobSpbikpSnUkm1qEm3hIiUkllsyuJ7aRmFLRh8cvlOnSLVlQfDiR6q31aCT3m8Cy7tOMW41rP6GHxHEncQkKdnuF1wm4SfRQOSRwplXXGtYihRbbO2XFNk7BMVUy8w+P4leVfencf1Hyrm6tWQaO9Na6rFJHUmVJcSlQG8Ugaw9z0/FnkZ7An0sYS0yvtSWCpt8HgsE3J8d/nTG1rPoxHWnhp809yPj7+bCpSHNziOjQgcVHQAd9c05diZNqXA0aWIFJYaQ7qpKAFHmbVhklljqDfCskjL4VB0ZvbBpcdyBibHZcacCMw+kDmR/8AVNtBPNfD5CLtKvhsU/M0G2G1E9+KyxHbDMGbHQ4l0XJcCkglN9wtcgitsmZILO5jY7D0heWO2pxQ1OUXt41W2lzLMZN1E6xPYafnwgiS3pYgHKQdCO6qV3n7m6L4RWN0abZ5pxlDofeC1uEKCQN2nGr6oyW7K78ZWEXGlWmc+fdqMb6faLFHWcllS3BmXySco9iagqZSuTnXDdTqPI0EFj8H0Tr20Uia4ApMNu47lrulPszVm1dnBU/XY26GvjuXpudHX0aEKUoABIuTyFJEsvCPQuWFlnGMWmnEMTlTFbnXCU9ydw9lq9BVBQgoo8rdY7LHN9RWGlHJYqFjYBJsVqPC/AW3/bVhWWrOFPFsHOhu+5KUJAPruT50AQpMJcd5N0pD2bsKSMoUeRHAnmNKAzg6HsxjMfFYwDScrrYAcQobu8Uk1OndTz0Z6PSaqN0cdUXqUhSgEJuSbVnUcvCNcpKKbZpYLSGIqUtkG3pEcTxp9TUq4KJ5fUWu6xzZm9o9isMxpwymc8Gfe4kMaa94/WNasaytylNp5RR/Evab+kbf91dV9zX8qLvEW/M/5kbb/rSMDU9FdWltC/l0J+ck6XPgbUs0Lj3uGtxx2ipunMXt1OZvPLUoOaWXqR37iKcCEZfIORQ9LcR3c/VQBIw9akycqUKUlYIUlIubUN45kpN7JHU9lXH14W0mQhaVI7AKh6Q4GkmqjGNj4T0WilJ0riXIfxDBGJr/AFlt12NJIsp1kgZxwzAix99cV3yguF7o7t0sLHxLZjEPAm2ZKZEh56W+j0FPEWR3gAWv311PUOSwlj6HFWkjCXE3l+pInYzBgXDjoWsfMb1I8eAor0tk+SwvULtbTVs3lk6JJamR232FZm3EhSTzFUzi4ScWaa5qcVJcmM4xE67hclgC6igqQOak6j3W860aOfBavJmTX18dL9ChwTaCQ3g7GHrxBSIzbirtrYbcSls6gi6Cb3J405k2uQihjO7JuIYrCgsNow3HFrztXCVMIQErzDT0NRa/qqt1Qe+NyxWyTxnYg4vtXFi4U05Ax9cmeXcq2DHSAlFjr6HO1c9zDHIl2vO0huHtu8zhqnvjK63IDeYx0xWiSrN6Kbo5a7+FdwzFtY2JnJOOeLckYTt9IkPOKxDaqRFZzqyAxGCrJbTc3v4V1mXEcYjw89ymgbPYs/hrGILTh2WUkPDp3lBfbUdSEptvudOFdpSfJZM0pxjvJ4+pBxyNIgQHHHvwd2yAAw4pSrkd4o4ZLmgjOEuUk/8Avoan4PoHUtnWnlCzkxZeV3p3I9gv50p19mZqPkPuzasVub6ljtO3KewGWzBRmdcQU2v80+lbvtes+nlFWpy6GrVRnKmUYczky4rzD3RyWlNFPBSbU7jJS3TPNyg4PElglRJCWlR3Vpzelu/OF/Zaujkfl4taS70zWvzO1w4eVuVACyZxkRGG1tWcOoN9QLi16ANPsRD6NUqTuC1kA91z9/KluvnuojfsyvnM0uIE9XCRIeYXmBS4ye0CNfvuqrRRzbnHIv7SlinGeY21tTNw0D8MMqlRQAPwhCHaRwHSI+zwvTcQmqw7FYs6MJEV9p9i1y60bhP5w3poDmM/GLD+b36Os/ia/M1eDtKmUy3KjuR30BTTqShQ5g0kjJxaa6Ho5xUouL6nMfiTi6LtK6AgLOVZd3jmdOIpv42rAg9nXehb4VsNHSM+KL6wv6DailP1ms9muk/g2NlXZsF+JuW7C8IwhfQ4bEDsjdkj9o+Z4VW4W2rim8L1/sWqzT0Phqjl+n92WENzElKccmhhlkosltJuUajtFXPu3a1xJ1R92C4n5/6LIxvl71j4Uun+WNStoYzN0R0qfcH0T2R513VorJ7y2RXf2jVDaO7KeRNn4ispWspbP8WyLes76YVaauvdLcVXay23Zvb0KfHGEtQlNNLSHrZilOvZ4+z3VoMpZ/B5imaM5AWSS2cyB+SaWa+vdTQ47MtynW/qbRLhuFAG43a0tTa3G7SawK/8HKRHek4diUpl91sqDKMiUknUJKiDYa2r0kXlJnkppKTS5Gb/ANm2PEtk3JbN0Xnp7Ph2Kk5GHPgpxRxZWthJUdSTOTr/AOlAZE/2T4n+Lp/x6f2KAyA+CbEh/J0/45P7FAZLEbC7VJZQymU+GkJCUIGJJskDcAMlQ0mdxslD4XglRfgjamw0qxXEZjD5JzNtrQ4kAbu1lHChJdDqy+2z45Nk5pLbKQw0nK2yA2kDgE6D2CvP3NysbZ6XTxjGqMY8sHq4vVZdgiTojMhBDrCHUHeFWNdwnKPIrnXGS3M1iGyUR1hzqKTHcOqQTdObw4f6Vtq1sk8T3Quu7Og1mvZmacwvF4yuiVGKsu4iyh5X19dMFdXJZTFctPbF4cWQ223BMS0sFUonspAPY7z38gNKsysZ6FXC2+HqdOwaMIGGtIVpZN1GkN03ZNs9LRUqqkjKSNppCpzz4CVxiqyGVjgNBY7wac01KuCijz+pud1jl06E3DcUYlqBiuKbkbuiWbKJ5A7lD291XFBNiYc2ZfXGUKiu3KXQ0ShLw4hSN3qt4Vh1Op4c1oZaLScWLZFzf72pZkc4JdVlo3IB6FxSAkuJSSgKJGY8r2qyqMZS954RVdKUY+7HLKOQxJeaKsYmJYjX/cGjkT5nea1xsinw0x+7MM6ZP3tRLbyW3+yH+G4kVHQ4TFCwNM6hlR9Zq2OknY+K1lEtdXUuGmJGHXsVcAdUt6+5CRZI8hW2qmFe0F/kXXaidu85f4NFheyLzmXrRDad+Qb62RobWZGGepitorJL2mwNOHYN1qKlSUtnt67+X1edc2xivhCmycm1I5stxXSdK4QlROYgj2Wqk0kSDI/A2NtPtkhsLGh4oV9/ZVdsFZBxLabXVYpo6u2pK0JWggpULgivPyWNj1MXxYaNpjNzszNyglXUV2ATmN8nAcfCvRQ+FHk5/EzhbPWFtJV1eZqi38Er+acx+dx3Dvrog95ZSiUpZlgqITc4Uu3ymoPp7gND30AJeSoBaWJaQR0gBwldx8xIPb4HU91AHrJKSbKYllA0IGFL1SgdsDt/OOooA8qRNykdHIz6pzDCV2zWuT6e7Lp40Adh+Dd0PbF4W4FBQWgm4Rkv2zwubUEMxm0OK/gdlcnoulu+UZc1t5P1UlhT3tso5xzPRTv7iiMsZ5FD8fP6h/m/ZV/s5/MZfav8H9Q+Pn/Tx+l+yj2f/EHtVfJ/UbVtuCbiB/m/ZU+z38xD7U/h/r/oBtsP5vB8XfsqfZ7+Yj2p/CabDnI+JRI8zoUpU4gKsd6b1hsTrk4ZGVMo2wVmOZe4ZHKl9KASlG4d9atHp+J95Lkv1MWv1XCnXHm/0KfavCdnJ8xLEx1MLEHUdIH2hZOu7ON2uu/101EhicT2MxWBJabcQh6M8sJRJZN0EcL8tK4smoRcn0LKq3ZNRXU2cVgR2G2kkkITYEm96RSk5ScmemhBQioroP2NcnRIO+uCwPdQBTbUYcZ2FLDYu40ekRfuGvsrVpLu7sWeph19HeUvHNbme2GjxcSxHqUvNmKSpvXQkbxT+uMXLEjzF05QhmJ13DcEjxkIQw0EniQP11PiJQv7uMMRxzM/dd5VxuW/kWB6syQhN3Hd2RuxNWNyms8jhKEXjmzxiMPr0N6PMIyLQU5EHQX7+dYLbYp7bvzGFNU3z2Xkv8nCZ0DqOISI8ghotLIUSLm9+Aq1PKyS1hlXiraHmStrNdr6e8pO/wBvvqSDZbCYn1zCerOqu7GOXxTwpRrquGfF0Y+7Mu4q+DyOrYsnp8CkxE5C6/EU2hKycpJTbW2tr8qZqaUVnyEsoNzePM4Q/gTuERkOykYQltSlFkoVLV20KyEnX0bk6+FTGcZciJQlHmQXnMMZbIzYaGwXGEjLMPo2UkXv9LeeIrs5GzNwlSiHFYeUqWnPZEz0VC7vHfe1uQoAdS7CWkOqXhuZTSnyoIlgE5sijv8Aoi1udAE6RhbbaoaGJGz5U+oBJ6xJIbCLFGftdkgHW9BB2vYBjq2yWHMdJFcDaSM8RaltHtH0VK1I8aFzA51tyL4ed1utcf7VK9L+PL7jrW/lY/b9DBv/ACRsUi4poJR+JDmzW3Fw4LryW1JSotoJsVEgaeVcuSXM6UW+ROxPZzGMMhply8PKWSLqKSFFv84DdXMbIyeETKuUVloqEuBSgLCrDg6Ps8SMIh5Tb5JNI9T+LI9Jo/wIfRFvg2PYfKdWxFlhmU0socQ4bpUQbeXjuptp4KFaQj1VjndJv/sFpiUXD8Sys4mwAojsO7vNKquM5R9RThqjCZkLeaaUVgqO4nha1hYW3czSvW2ZkorkOezasQdjW7PQGtYcjM9WqMkjeIvFsBCDZSjfwFNuytLGyUpzWUtvuJe2tZKqEa63hvf7f+kdqY4g2XZY9Rrbf2RVPevZ/wBBfp+3Lq9rVxL+TLjBzDmyAH3UNgfMWbFZ5Vhr7LsjZ+05L+pvu7ZqlV+y+J+fQ55tLEd2S2xUqMChtLgkx9NMhO7yNxW9rhewrTUkdkiYkvFoTEiMQGXkBSUo131piopcTF1jscuBDcnFsMwVp0gOSZKUkuNsDOpNhx4JrPbOy7KXI10VV0Yb5syuL7UT5+AjE4bqGY6yEoZaV8oo5rEKUd3fYXFwdRWWNcXnIwfFFrJk9p1Q5y0O4e043ZICwv5x4nfy58q0JbLJQ8NvHIoWG1SFluM2qSsgpUhoXSAeatwrmU4xWWyYQlN4ismk2R2YmYZJMuS+lOdGUtI1BHeaWavUV2Q4I7jnRaSyqXHJ/Y6otwrseGVI15AVdniMbWG8f9ue4jCHZCElCdNTpw5VZUnKW/1ZXa+GO30RLltRmQkiKwbk70CtZkIpcjpFzDjAf9sUAe4Co0p5aDDYASm4IQNdaAJ3VIv4sz/cFADrbaG0pQ2lKEg6BIsBQgOPbdpthp0/lX7VK9J+Yl9/1HWt/Kx+xgpx+WJB+dvFNBKbr4MJb6lSm5MxkxnBkbYWsdKpepJHG1ibk1m1HNYRp0/XLNkMKdbUoNT5KG7adrMLcrGqO980Xd15M5Ti7eGwscmQ3IbgWy8pPSNu2vxvl3DQit0HmKZikuGTRsdn0JOCwyeLQ0pLqPxZfU9FpM9xD6IzmObEkOGZgj5ZcBzdGtRGv5Kt4rVTrekzFf2dn3qv5FjsdiO0eWRDxBF2mhlu6jW9t44G3OtF2qjGPub5M1GilOT41hI0CGgEAAdkaXpQ8v3mPVhe6OJTUHR7y0EFVLc6V9Z4A2Feu0VHc0Rj15s8Pr9R4jUSn05L7DNajEHjrRgCp2rYcl4ch0qUtUXVNzeyTvH66zaitOPEjVprGpcLJ3we49HGGPYfisyQhhg50NNfxgJ1GnaPhe1ZFh8zXNS/dJEvbUstuMYRHbiRMxs64E5sp4cQPqoU31Oe5jnJmYxfl9jCohcG7pVDI36+PlVM7YVrLZsrpstfuouImy3S2Xi0gv8A/JR2UD6/OsFmub/DGdPZsVvYzRxYzMVsNx20NoG4BNYpzlLeTyMoQjBYisE6E30klCTYi+tRBZkc2y4INl7WwVD8fMtXRoulSj2iBuFaKve91fcz24XvP7ErEwsNNdG2pZFxoL1uMZVLYkqN1Mun+yagCbg7LrbzhcbWkZN5FuIoAtaAFG8eNBHQ49t6bYaD/W/2qV6T8xJDrW/lo/YwEq7yypPE31NNBMNJbWFJUMuZKgoE8CDcUY6BnG53bAsUaxjC2JrR1WLOIvqhY3pNLbIOMsDKEuNZRyvbqMpra6W5lOV3IsHn2QP1VtpzwIxW47xms2e/gOCR/wAFNJ9R+LI9BpPy8Poi4iR1yXg2k2BBJURe333eJriqt2S4Ud3XRpg5SHdk9ocKfj4g9GYcaTFy9K/KsCoG+5IvYXG69zTmmiNS82INRqZXPyRa9MvGsIkhllhLAQh+CtrTpLC6gU8DvHnRfUpVuKQaa5wuUmZ1tWbXd3UjPSDtAFGa9yfORKACgBFJC0lKhdJFiOYoazsSnjcyEXBcQRjXVYmVJWopQpet0nu++6lzoks+QyWog8eZ0fB9gMOjKQ9iSlzpA4u6ISe5O6uVFHTmWuMQosdsOR0JbXuKEiwP1Vg12njwu1cxn2bq58aofL9CrBP0fbSjI/wewfyfbRknBOwsHp8+WwAtWvSaedrbj0F3aOphTBRl1J8iW2wjMtKjyA41bbCVSzJGSiUb3itlG5ik0vqcbecYvpkbXawrP3818Lwb/CVv4llgMUxH8ek/pKPE2/MT4Oj5T2MTxD8dlfpKPE2/MHg6PlBWKzEqSheIPhStAlTuqvCjxF2M5eAel06eHFDoxCdu67Ivy6So8Tb5snwdHyjbuMPtLQ07ibqFuHKlKndVHwruNmpknKOWlzOJUaSDSkkmyLLhMS2OhkNBxu97K586zxsnB8Se5qlVCa4ZLYq3MBw5Cv3mi3PWrVqbfmM70dC/dEGB4af5Eip8Tb5h4Oj5TQ7JYay1IfYhNIZ6QBatTY2/19lbdDdxzas38hb2nplCuLq233HdrNnIquhlSWUPlPYNwdAdff76u185xipQ2KOy6q5TcLFnJXxmkMMoZZbCW0CyUg7hSWUnJ5Z6OMFCKjHkgnxXMRw8w2XTHkodS/GdzWR0qdUhdt408jrzrVpLlB8L6mLW6dzXGunT/BQpxROyu08iVLiLRBxVkOPRyAS0oq7abHQ5Fheg4WpumIGsPB0KF1QTokxqQpDSG8rbbSewpJHAAXOnAaeypIKnFYoiYgtLX7m4OkQlQIKUngQaSamvu7Gj0eit72lPy2GdazGvBQmvdHzgSgAoAN+lAF7sTgTxmvYjOa6NKkfIHNe9+Puqi+xNKKL9PW4tyZp5a+qA57FR9G241mSyzS5YRmpUtchw5XOxftH6X2Uq12q4v2cOQ87N0Dhi6zn0GgRzpYOj2KANphmHtsYehp5AU4e0u44n6t1PtLW6q0up5fW29/a306FBtAG0TEMsEgJGcpOvcKydo3N4r+5u7J00Y8Vv2KlxsK140rTHTQyBrXRGCtx55UZll49ZUwFlLrcZwIWu407VjYX5c61aNQlPEkYe0JWQrUoPBnky+leQYOFxopQtK7pzyJC7G9i4okgdwtTKzgUGnsJqnY7FJbtFhiDc1a5cll1LbSSsgdaSlQsNeyTfnwqvT1QcI5SLNXOSunhle00VrPpF82ICe0sngT9tPrJ1V18MsKIhpqvttU45ckbWK6tTDZeTlcKQVJ5GvEWKKk+F7H0GHE4pyW44rKoWrnJ00MlBB7q6yc4LPZ13ocXY5Lug+YrRpZcNyMmvhxaeXpv/ACNXisfrMRxn6aCAeR4e2nVkOODieeqsddimuhhVKWEKyjtgbjzrzuMSwz1ucxyjLPbTOxo7SpUhlyU6gL6tFaKyi/AkkW87Vv8AC1Yzlirxl2cYWTy5tB8YBh5xvDm0ohlzo3V9rpx2ewUBWutj6R3GtlTUVw8XIwXxcnxqOC2w/wCER1iSxFwfDoRQVBo3aLWQW4WJ3AbiBU2XcKZFVDnJF3JnyMQdD0lwLNrABNgkchSW22dksyPQ0UV0xxAS9VlpQmvdZPnAlGQCjIHtlpbzqGmxdayAnxqG8LJKWXg6dCjJhw2WEei2kJGtYJPqb0sbGaxmX1uU4lly8fKAdN55g8qT6nXSbdcHsP8AR9mwSjZYveKrownThS4cbnpKRUElts9DEqeFKTdtntnlfh9+6tejp7yzPRGHtC/uqcLm9jXPLskJB1O+nnI81jJhJT4lS35GpC19nwGg91ee1FneWNnq9LX3VUYjelUmg8qQk621qUyBp5hl9stOoStB3pIqYycXxJ7nMoKa4ZLKPLbDTCcjSEoTySLUSk5fEwjHhWI7A7EYeSoLabUFiygob/GpjNxaafIiVcZJprZjbMRphORltLY/JFqJzc3me7IhXGC4YLCJSUJHL11zsWHqw5ioJFKRapTIFYV0MhpwGxQtKx5G9dQliSfqcWR4oSj5o3r5BSlQ3HdXo87ZPI46Mw20kFYkvtMvrjF8Z0ONgEpJ32vcb7+uk2sgq7uLGUz0Ohsd2n4c4aMh8T4bTpLbr6cxu52gorPE3Outc+Jk+aO1o4R5Nli9g0N6AmEWiltBugpPaSed/PjVatkpcRdKiDgoeRVo2UaZkCU1LfRKR+5upCQU9xFrHz51b4ltYa2KPBpPPE8miYCkJTnOY2Fza16ys2LPUl501GCclGd9e4PnQUEBQBabMgHG41xfU+41Xb8JZV8Rs8dJThz2UkXABtypZqX+xkONCk9VFMyat4rzn7qPVoRzcKlEs8poA1eyYAgOEAX6X9Qpt2f8D+v9hD2r+Kvp/cnYlpEkkbw2r3Vus+F/Ri6n8SP1X6mHT6CfAV5lcj2AtSQLwoJEO6gBeAqUAWF91QAhoIPVhyoJCpIFTQAp9Gp6EG5R+9GfzR7q9JD4UeRs+Nmf2lA/3M21u5r5CsHaPKIy7K5z+39yid3ClY6PFBIGpIFG6gD3QB//2Q==",
    author: "Beka Haile",
    date: "05/05/2023",
    userImg:
      "data:image/jpeg;base64,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",
  },
  {
    id: "3",
    title: "Placeholder Post 3",
    content: "This is a placeholder content for post 3",
    img: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Beka Haile",
    date: "05/05/2023",
    userImg:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIsAiwMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAACAQMEBwAFBgj/xABAEAACAQIDBAYIAwYFBQAAAAABAgMAEQQFIRITMXEGIkFRUpEHFCMyM2GBoULB0RYkcpSx8BVTYpPiCBc0Y5L/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAwQBAgUG/8QAJREBAAICAQQCAQUAAAAAAAAAAAECAxExBBITIQVBURQjYXHw/9oADAMBAAIRAxEAPwC4qmRH2S8qzdx+EVGZmViASADoBQLiPifSjwv4vpSwKHS7gE95oZhsEbvq342oDxPuDnTMPxV50UPXfZfrC17GnJUVULKoBHbQOseqeVQaLbftZrc6lbuPwr5UGR/DXkKjT/GasZn2mCluPZT0SBowXF27SaBMKeq3OsxPujnQTdRxsdW47KyD2jkP1tO2gGD4q1KkPUbkablRUQlBZu8UyGYsAWNibHWgCpq+6OVJuo7e4vlUUu17BjYfOgWb4rc6CpMSK6AsAT3mj3SeAeVBH37948qcSFHUMb3OppPVu5vtSCUp1LX2dL3oEZjE2wnDjrSxjfm8nZwtWKm+65Nuy1L/AOOdNdqgyRBCNqPjw1oVkaRgjEbJ46Uu16wdgi1tb0pi3fXBuR2d9BrukGb5T0cy98dm+KTDwqDbaPWc24KO01RfSv0253mEjRdH0XLcL2SMoeZh873C8h51znpY6QSZ/wBNcwcYkzYTDSGDDAX2VVdDYfNgTft8q40gjjQbvFdMOkuLk258+zJm+WJdR5A0/lnTvpVlkm3hM+xwN+Esu9Hk9xXOUtBfnQL0xw5riY8v6WRxYad7LHjIurGx7nB93nw5VbrgRANGeP1rxOATXpf0H5pmec9DVTNLtHhZTDhp2N2kQAaH+G9r/pQWArtKwRzoe6jaBFUsL3GopDHueuDe3ZSGct1dnjpxoB38nePKnRAhAJvrrQ+rC3vfak35Gmzw+dAjSNGxRToOF6Tfyd48qIRb3rk2v2Uvqw8X2oC9YXuNN7pnO2trNqL0O6fwmn0kVUUMbEDUUAI4hGw2p+VI95yCmlu+kkBkcsguO+ih9lfeaX4UCKpgO2/A6aVks4aNgtw1tKKZhIoVNTfhTaoysCykLfWgof0N9GcLj5M0zrMsPHiAJWw8KSptC51drHQ6EDzrfZ96IsgzB2ly2SbLZTc7MftI7/wnUfQ2rf8Ao9y05X0cELrZ3xWIkPLesAfJRXSVkvkmLem3HirNI3CkMV6FM4Vx6pmuXyp3y7yM+QVqcwXoTzFiPX85wcQvqMOjyf1C1dYpaea7v6eitJvRDkmHyPGxYd8TiMyMJME8r7IVwLgBRpY2trfjW2/6fJmXobiVkBG7x0i2tqLqprtRoQa0no3ys5Zh8+wqjq/4xM6AdiFVI+zCqYrzbe0c+OK607RpBKNhdCe+h3LqdokWGtJGpRwziyjiaeeRCpAbUjSrs4fWEtwag3DnUEWNBun8JqSsqBQC1A2koiGwwNx3UXrC9xpp1Z3ZlBIJ0NJun8JoJd17xUN/iNzNCLX4VMi+EvKgDDECPXQ37aDEkErb58KHEfF+lHhPxUAYfSQ37qzM3K5fiTGesI2tblTmK+GOdMxKDIAQCDXJ4djlpMEFGEiCAABeAp6nsRhEwbBIb7s3IB7NeFM1htGp1L6VJi0bhlLSVlcey0WRMBmWNCgBW2Wb5ta1/IfahsSbDjwFbGPBx4SKyXLO205J1JquGJm22bqLRFdJc5G6Njrp/Woyjrrp2iigHtVqVJ8NuRrWxFuLcRUEjXhSWHdU5PdHKgCEgRi5F6cuO8VDmHtW50FhQTd2nhXyqM7HbYAkC/AGs30ni+1PJEjKGYXY6k3oMgUOl2AJ7zrQYgbBXZ00PDSkkYxNsxmy0UQ3195rbhQDB15CGN9O3WnZVVYyQAD3gUMqiEBo9De1NrI0jBXN1PGgj4hd5GbnVdb3qBxrb4qOIQuODMCBrXNxTPhH9XxYtb3X4gis2avvcNfT2+k2soBNER8WP/6FNT42GIaMHbuU3qDVtPwibUm1p1eytjB1mIbUAaX1rWZHFIu8fF+9MQQDpb+71tZAIgDHoToe2tmKuqvn5rd1hTKFjJAAOmo0phWYsoLG1x20aO0jBXN1PGnGiRVLKNQLjWqJD3a+FfKohZgdGPnRb6TxfanxDGQCV150CQqGQEgEntIvR7tfCvlUd3aNyqGwHAUm+k8X2oHfVh4jQb0p1LA7OlzR+sL4TQbln64I62tqAlTfDbJsflSN7D3ettd9Yr7kbBFzfsrkOknTJYZWw2VqskiXDTNqqnuA7efDnXa1m06hyZiOXWSzoELYh0ijXUuxsB9TXL5305yrKn3eED47EAXAjIVBzb9Aa4bGYzE46XeYzESTN2bbXA5DgPpWlx4Yzltk7OgBtpVvFrlPyLa6L9IP2hwD4iREjxET7EsSG4XtUi/ePuDWyxeGjxUWw+h/Cw4g1U/QzN/8IzuJpGthsRaGbXQAnRvofterf7bdtSvXUqUtPLlcRBJhpTHILW4dxHeK2uV5dsbM+IHX4oh7PmfnWmz/AKTpBmEMWDjjnXDyXlZhxPAqp/PvHyrpsBjIcwwqYnDNtRv5g9oPzrxPS2x6vMepea/I481pxUn3H+9HpHSON5JGCoilmYnQAak1xuC9JeHknePMME6YcOd3PC1zs302lPbbu8qc9I+b+q5amWwt7XGavbsjH6nTkDVZgEmygk9wFWpTce3LW1K/MDmGBxaiTA4uKcj8Ktr9RxqVvi3VsNdKpSEsojcErIoGo0Kmujyfpbj8E6LjCcZADqHPtBybt+vmKWxa4IyflZfqwt7xod+w0sNKZwGa4bH4VMThWMkbjkQe4jsNOiBjrtDWpKCEe9G2SQT2Cl9WHiNIJRENggkjupfWB4TQNbmTw08kqooVj1hodKc208Q86iOpLsQCQSeFBoenGZtgst2IG2ZcSd2G4FVA6xH2H1qttOyus9Ijn1/Bxn8MLGx+bf8AGuTrVijVULzuWUxjJTFAdm9205U+dKGWMSxsh4Npyqjw0p10NW90DzQ5zkirKwfE4W0UwJ1I/Cx5j7g1UTKVcq2hHGtz0Szt8jzXf67mVDHKB8x1T9D+dRvXb33dsbbDHwwDHYgQArEJXCC/AbRtXZdClw8OQ4iY2RUkZpnJ4AAG/lXE63O1xJ1rMdnD4TIsRlcJIbFyq0hHZGBqPqQPoDX0Opp+1r+n5T4jLM9bufvbUZ7mb5xmuIxsl9mRrRqfwoPdHlqfmTTeXyFZdixs/wBjUSthl0OyhlYatoOVYojT9VKZWVlZXt5dB0LzF8Jmy4dm9jijskE6B/wn8vr8qs8TIABfh8qpXCyGLFQSqbFJFYHkQauJlNzZT5VmzR7Wx8CZGkYsgup7azcyeGnoWCxgMQD3Gj208S+dSUQqlw/CXlRbI7h5VEcnbYA217KDgPSI1+kCjw4dR92rl6tfGdGstzaf1rGRyGXZCdWQqLDhoOdQ5+hmSoRaGbX/AN7VeuWsRpKaTMquxb7Ean/Wv9b/AJU9VjfsPkWJ9nLDPsjXTENx86kP0JyREJEM3++1d8tXPHKo8yi1EoHyb8qg1cLdDckkUo0MxB4+2al/7c9HP8nE/wAy/wCtcnJU7JVxl+IEmF9o1miFmPy7/L+lajEymed5D2nQdw7KtgdA8hj3iJDiQG6rfvL6i9ORejzo66BjBiP5hqrfqYtWKsXTfHVwZr5I++P4/Ko4IjLKqDt48q24AUADQAWAqxv2FyHDMd1BP1hqTOxp2HoZkrkgwzaD/Pap+Wrb2Sq93/e40/0N/f2p6rJm6CZCHE+5n21Fh+8N+vzoV6H5NtAbmbU2+O3608tTxyrgmwJFXhC23Cjd6g/auePQfJLH2U/++1bZRsKEUmygAa1PJeLcPdKzApfivzoalQqDGLgeVHsr3Dyqb2iiV+1z5U8kaOgZl1OpqNUyH4S8qBiRjG+yhKjupYRvb7zrW4UOI+IeVHhfxUGSqIhtR6G9r0CMzsFZiQTqKdxXuDnTMPxV50D5hQAnZ1qOJZPGamN7p5VAHCglJErKCwBJFzTUjNG5VDYDsqRF8Nf4RUaf4zfSgciAluX1I4VkoEQBj6pOmlLhfdbnWYr3RzoG0ZpHCubqeIp54kVSQuo1FMQfFX++ypUnuNyoIm9k8Z8qkLChUEr2VFqcnujlQRXdkcqrEAHQUO9k8Z8qyb4rc6Gg/9k=",
  },
  {
    id: "4",
    title: "Placeholder Post 4",
    content: "This is a placeholder content for post 4",
    img: "",
    author: "Beka Haile",
    date: "05/05/2023",
    userImg:
      "data:image/jpeg;base64,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",
  },
  {
    id: "5",
    title: "Placeholder Post 5",
    content: "This is a placeholder content for post 5",
    img: "",
    author: "Beka Haile",
    date: "05/05/2023",
    userImg:
      "data:image/jpeg;base64,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",
  },
];

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>(PlaceholderPosts);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogs();
        if (res.length > 0) setBlogs(res);
      } catch (err) {
        toast.error("Error fetching blogs");

        console.log(err);
      }
    };
    fetchData();
  }, []);

  const openDetail = (id: string) => {
    navigate(`blog/${id}`);
  };

  return (
    <PostContainer>
      {blogs.map((blog) => (
        <Post key={blog.id}>
          <Img>
            {
              <img
                src={
                  blog.img
                    ? blog.img.includes("http")
                      ? blog.img
                      : API_URL + "/uploads/" + blog.img
                    : ImgPlaceholder
                }
                alt=""
              />
            }
          </Img>
          <Content>
            <Link className="link" to={`/blog/${blog.id}`}>
              <h1>{blog.title}</h1>
            </Link>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  blog.content
                    ? blog.content.length > 100
                      ? blog.content.substring(0, 100) + "..."
                      : blog.content
                    : ""
                ),
              }}
            ></p>
            <button onClick={() => (blog.id ? openDetail(blog.id) : null)}>
              Read More
            </button>
          </Content>
        </Post>
      ))}
    </PostContainer>
  );
};

export default Home;
