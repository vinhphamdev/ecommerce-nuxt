export const stickyHeader = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById('headerSticky');
    if (header !== null) {
        if (number >= 300) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    }
};

export const mapboxToken = "pk.eyJ1IjoicGhvbmduaGF0MTkiLCJhIjoiY2traWtzMXRrMjV4dzJvcGE5cHQ3MWJmaiJ9.ohDtLEc_AuCHfk1Ns3t8hA";

export const stripeToken = "pk_test_51IDw7QHYRruOoW8HFWgG6rgdEuicAla4kQfpH11fdOwJgS8sqd44yWoX9dpIuuVsg7zhjLzCYNkD1JJkxGAUisub00KzvQ5vKh";