import { Feather } from '@expo/vector-icons'

export const tabbaricons = {
    home: (props) => <Feather name='compass' size={24} {...props} />,
    bookmark: (props) => <Feather name='file-text' size={24} {...props} />,
    create: (props) => <Feather name='plus-circle' size={24} {...props} />,
    profile: (props) => <Feather name='user' size={24} {...props} />
}