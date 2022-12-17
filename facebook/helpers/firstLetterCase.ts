export const upperFirstLetter = (name: string) => {
    if(name) {
        return name.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    return ''
}