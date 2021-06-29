const getItems = (handleLogout, admin) => {

    const items = [
        {
            to: '#',
            onClick: handleLogout,
            text: 'Logout'
        }
    ]

    const adminItems = []

    if(admin){

        items.push.apply(items, adminItems);
    }

    return items;
}


export default getItems;
